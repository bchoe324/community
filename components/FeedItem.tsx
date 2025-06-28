import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeletePost from "@/hooks/queries/useDeletePost";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FeedProfile from "./FeedProfile";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface FeedItemProps {
  post: Post;
  isDetail?: Boolean;
}

export default function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { auth } = useAuth();

  const likedUsers = post.likes?.map((like) => like.userId);
  const isLiked = likedUsers?.includes(Number(auth?.id));
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deletePost.mutate(post.id);
            break;
          case 1:
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <FeedProfile
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={dayjs(post.createdAt).fromNow()}
          onPress={() => {}}
          option={
            Number(auth.id) === post.author.id && (
              <Pressable onPress={handlePressOption}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color={colors.BLACK}
                />
              </Pressable>
            )
          }
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuItem}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text
            style={[styles.menuItemText, isLiked && styles.activeMenuItemText]}
          >
            {post.likes?.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color={colors.BLACK}
          />
          <Text style={styles.menuItemText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="eye-outline" size={24} color={colors.BLACK} />
          <Text style={styles.menuItemText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    gap: 14,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
  },
  textContainer: {
    marginTop: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  menuItemText: {
    fontSize: 14,
    color: colors.BLACK,
  },
  activeMenuItemText: {
    color: colors.ORANGE_600,
  },
});
