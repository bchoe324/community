import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import CommonInput from "@/components/CommonInput";
import FeedItem from "@/components/FeedItem";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isPending, isError } = useGetPost(Number(id));
  const [comment, setComment] = useState("");
  const createComment = useCreateComment();

  if (isPending || isError) {
    return <></>;
  }

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleCommentSubmit = () => {
    createComment.mutate({
      content: comment,
      postId: data.id,
    });
    setComment("");
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.awareContainer}>
          <ScrollView style={styles.scrollView}>
            <FeedItem post={data} isDetail={true} />
            <Text style={styles.commentCount}>댓글 {data.commentCount}개</Text>
            {data.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <CommonInput
              placeholder="댓글을 남겨보세요."
              value={comment}
              returnKeyType="send"
              onChangeText={handleCommentChange}
              onSubmitEditing={handleCommentSubmit}
              rightChild={
                <Pressable
                  style={styles.commentButton}
                  onPress={handleCommentSubmit}
                  disabled={!comment}
                >
                  <Text style={styles.commentButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollView: {
    marginTop: 12,
  },
  commentCount: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: colors.WHITE,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
  },
  commentButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.ORANGE_600,
  },
  commentButtonText: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
  },
});
