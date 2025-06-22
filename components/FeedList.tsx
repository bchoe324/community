import { color } from "@/constants";
import { Post } from "@/types";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

export default function FeedList({ posts }: { posts: Post[] }) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    backgroundColor: color.GRAY_200,
    gap: 12,
  },
});
