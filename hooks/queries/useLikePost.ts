import { likePost } from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export default function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS],
      });
    },
  });
}
