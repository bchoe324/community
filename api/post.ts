import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import axiosInstance from "./axios";

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);
  return data;
}

async function getPosts(page: number = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);

  return data;
}

async function getMyPosts(page: number = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
}

async function getLikedPosts(page: number = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/likes?page=${page}`);

  return data;
}

async function getUserPosts(userId: number, page: number = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(
    `/posts/user/${userId}?page=${page}`
  );

  return data;
}

async function deletePost(id: number): Promise<number> {
  const { data } = await axiosInstance.delete(`posts/${id}`);

  return data;
}

async function getPost(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
}

type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};

async function updatePost({ id, body }: RequestUpdatePost): Promise<number> {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
}

async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`
  );

  return data;
}

async function likePost(postId: number): Promise<number> {
  const { data } = await axiosInstance.post(`/likes/${postId}`);

  return data;
}

export {
  createPost,
  createVote,
  deletePost,
  getLikedPosts,
  getMyPosts,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
  updatePost,
};
