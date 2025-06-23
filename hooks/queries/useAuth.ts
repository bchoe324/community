import { getMe, postLogin, postSignup } from "@/api/auth";
import { deleteHeader, setHeader } from "@/utils/header";
import { deleteSecureStore, setSecureStore } from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });
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

export default function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  return {
    auth: {
      id: data?.id || "",
    },
    loginMutation,
    signupMutation,
  };
}
