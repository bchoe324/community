import { deletePost } from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS],
      });
    },
  });
}
