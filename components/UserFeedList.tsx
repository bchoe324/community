import { colors } from "@/constants";
import useGetInfiniteUserPosts from "@/hooks/queries/useGetInfiniteUserPosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FeedItem from "./FeedItem";

interface UserFeedListProps {
  userId: number;
}

export default function UserFeedList({ userId }: UserFeedListProps) {
  const {
    data: posts,
    hasNextPage,
    isRefetching,
    refetch,
    fetchNextPage,
  } = useGetInfiniteUserPosts(userId);
  const [isRefreshing, setRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);

  useScrollToTop(ref);

  const handleEndReached = () => {
    if (hasNextPage && !isRefetching) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.container}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>작성한 글이 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    padding: 16,
    backgroundColor: colors.WHITE,
    alignItems: "center",
  },
});
