import FeedList from "@/components/FeedList";
import { color } from "@/constants";
import { Post } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";

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
    <SafeAreaView style={styles.container}>
      <FeedList posts={mockPost} />
      <Pressable
        style={styles.writeButton}
        onPress={() => router.push("/post/write")}
      >
        <Ionicons name="pencil" size={32} color={color.WHITE} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  writeButton: {
    backgroundColor: color.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    position: "absolute",
    bottom: 16,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: color.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});
