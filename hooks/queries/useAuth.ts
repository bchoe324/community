import { getMe, postLogin, postSignup, updateProfile } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { deleteHeader, setHeader } from "@/utils/header";
import {
  deleteSecureStore,
  getSecureStore,
  setSecureStore,
} from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
  });
  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      deleteHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace("/");
    },
    onError: (error) => {},
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      router.replace("/auth/login");
    },
    onError: (error) => {},
  });
}

function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (newProfile) => {
      // 현재 사용자 정보 업데이트
      queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_ME], newProfile);

      // 모든 포스트 관련 쿼리 무효화 (무한 쿼리 포함)
      queryClient.invalidateQueries({ queryKey: [queryKeys.POSTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST] });

      // 즉시 리페치하여 UI 업데이트
      queryClient.refetchQueries({ queryKey: [queryKeys.POSTS] });
      queryClient.refetchQueries({ queryKey: [queryKeys.POST] });
    },
  });
}

export default function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const profileMutation = useUpdateProfile();
  const logout = () => {
    deleteHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
  };
  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
      imageUri: data?.imageUri || "",
      introduce: data?.introduce || "",
    },
    loginMutation,
    signupMutation,
    profileMutation,
    logout,
  };
}
