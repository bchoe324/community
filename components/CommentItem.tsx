import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types/index";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FeedProfile from "./FeedProfile";

export default function CommentItem({
  comment,
  isReply = false,
}: {
  comment: Comment;
  isReply: boolean;
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

  return (
    <View style={styles.container}>
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
        onPress={() => {}}
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
      <Text style={styles.commentText}>
        {comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
      </Text>
      <View>
        <Pressable>
          <Text>답글 남기기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
  commentText: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    fontSize: 14,
    borderRadius: 8,
    marginTop: 12,
  },
});
