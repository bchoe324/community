import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import CommonInput from "@/components/CommonInput";
import FeedItem from "@/components/FeedItem";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import React, { Fragment, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isPending, isError } = useGetPost(Number(id));
  const [comment, setComment] = useState("");
  const createComment = useCreateComment();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleCommentSubmit = () => {
    const commentData = {
      content: comment,
      postId: data.id,
    };

    if (parentCommentId) {
      createComment.mutate({
        ...commentData,
        parentCommentId: parentCommentId,
      });
      handleCancelReply();
      return;
    }
    createComment.mutate(commentData);
    setComment("");
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss();
    setComment("");
    inputRef.current?.blur();
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.awareContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollView}
          >
            <FeedItem post={data} isDetail={true} />
            <Text style={styles.commentCount}>댓글 {data.commentCount}개</Text>
            {data.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  comment={comment}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                />
                {comment.replies?.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <CommonInput
              placeholder={
                parentCommentId ? "답글 남기는 중..." : "댓글을 남겨보세요."
              }
              value={comment}
              returnKeyType="send"
              onChangeText={handleCommentChange}
              onSubmitEditing={handleCommentSubmit}
              ref={inputRef}
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
    backgroundColor: colors.GRAY_200,
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
