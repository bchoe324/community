import { CreateCommentDto } from "@/types";
import axiosInstance from "./axios";

async function createComment(body: CreateCommentDto): Promise<number> {
  const { data } = await axiosInstance.post("/comments", body);
  return data;
}

async function deleteComment(id: number): Promise<number> {
  const { data } = await axiosInstance.delete(`/comments/${id}`);
  return data;
}

export { createComment, deleteComment };
