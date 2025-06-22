import FeedList from "@/components/FeedList";
import { Post } from "@/types";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

const mockPost: Post[] = [
  {
    id: 1,
    userId: 1,
    title: "1. 피드 티이틀입니다.",
    description: "피드 디스크립션입니다.",
    createdAt: new Date().toISOString(),
    author: {
      id: 1,
      nickname: "테스트 닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: "2. 피드 티이틀입니다.",
    description: "피드 디스크립션입니다.",
    createdAt: new Date().toISOString(),
    author: {
      id: 1,
      nickname: "테스트 닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 3,
    userId: 1,
    title: "3. 피드 티이틀입니다.",
    description: "피드 디스크립션입니다.",
    createdAt: new Date().toISOString(),
    author: {
      id: 1,
      nickname: "테스트 닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FeedList posts={mockPost} />
    </SafeAreaView>
  );
}
