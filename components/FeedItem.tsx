import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeletePost from "@/hooks/queries/useDeletePost";
import useLikePost from "@/hooks/queries/useLikePost";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FeedProfile from "./FeedProfile";
import ImagePreviewList from "./ImagePreviewList";
import Vote from "./Vote";

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
  console.log(likedUsers, isLiked);
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();
  const likePost = useLikePost();

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

  const handlePressLike = () => {
    if (!auth) {
      router.push("/auth");
      return;
    }
    if (!isDetail) {
      router.push(`/post/${post.id}`);
      return;
    }
    likePost.mutate(post.id);
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <FeedProfile
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={dayjs(post.createdAt).fromNow()}
          onPress={() => {
            router.push(`/profile/${post.author.id}`);
          }}
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
        {/* 텍스트 영역 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
        {/* 이미지 영역 */}
        <View style={styles.imageContainer}>
          <ImagePreviewList imageUris={post.imageUris} />
        </View>
        {/* 투표 영역 */}
        {!isDetail && post.hasVote && (
          <View style={styles.voteContainer}>
            <View style={styles.voteIconContainer}>
              <MaterialCommunityIcons
                name="vote"
                size={24}
                color={colors.ORANGE_600}
              />
              <Text style={styles.voteText}>투표</Text>
            </View>
            <Text style={styles.voteCountText}>
              {post.voteCount}명 참여중...
            </Text>
          </View>
        )}
        {isDetail && post.hasVote && (
          <Vote
            postId={post.id}
            postVote={post.votes ?? []}
            voteCount={post.voteCount}
          />
        )}
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuItem} onPress={handlePressLike}>
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
        <Pressable style={styles.menuItem} onPress={handlePressFeed}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color={colors.BLACK}
          />
          <Text style={styles.menuItemText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable style={styles.menuItem} onPress={handlePressFeed}>
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
  imageContainer: {
    marginTop: 14,
  },
  voteContainer: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.ORANGE_100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  voteIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  voteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  voteCountText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: "600",
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
    width: "33.33%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
