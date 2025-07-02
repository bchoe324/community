import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types/index";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FeedProfile from "./FeedProfile";

export default function CommentItem({
  comment,
  isReply = false,
  parentCommentId,
  onReply,
  onCancelReply,
}: {
  comment: Comment;
  isReply?: boolean;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
}) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

  const handleDeleteComment = () => {
    deleteComment.mutate(comment.id);
  };

  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      { options, destructiveButtonIndex, cancelButtonIndex },
      (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            handleDeleteComment();
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }
    if (isReply) {
      return colors.GRAY_50;
    }
    return colors.WHITE;
  };

  return (
    <View
      style={[
        styles.container,
        isReply && { paddingBottom: 16 },
        { backgroundColor: getCommentBackground() },
      ]}
    >
      <View style={styles.commentHeader}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={colors.BLACK}
          />
        )}

        <FeedProfile
          imageUri={comment.user.imageUri}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {
            comment.isDeleted
              ? null
              : router.push(`/profile/${comment.user.id}`);
          }}
          option={
            comment.user.id === auth?.id && (
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
      </View>
      <Text style={styles.commentText}>
        {comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
      </Text>
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable style={styles.replyButton} onPress={onReply}>
            <Text style={styles.replyButtonText}>답글 남기기</Text>
          </Pressable>
          {parentCommentId === comment.id && (
            <Pressable style={styles.replyCancelButton} onPress={onCancelReply}>
              <Text style={styles.replyCancelButtonText}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  commentText: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    fontSize: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  replyButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  replyButton: {},
  replyButtonText: {
    color: colors.ORANGE_600,
    fontWeight: "600",
  },
  replyCancelButton: {},
  replyCancelButtonText: {},
});
