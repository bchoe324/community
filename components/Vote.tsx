import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useCreateVote from "@/hooks/queries/useCreateVote";
import { PostVote } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CommonButton from "./CommonButton";
import VoteOption from "./VoteOption";

interface VoteProps {
  postId: number;
  postVote: PostVote[];
  voteCount: number;
}

export default function Vote({ postId, postVote, voteCount }: VoteProps) {
  const { auth } = useAuth();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const createVote = useCreateVote();

  const handleVote = () => {
    if (!selectedId) {
      Alert.alert("투표 항목을 선택해주세요.");
      return;
    }
    createVote.mutate({
      postId,
      voteOptionId: selectedId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>투표</Text>
        <View style={styles.headerVoteCount}>
          <Feather name="user" size={14} color={colors.BLACK} />
          <Text style={styles.headerVoteCountText}>{voteCount}명 참여</Text>
        </View>
      </View>
      <View style={styles.content}>
        {postVote.map((vote) => {
          const voteUsers = vote.options.flatMap((option) =>
            option.userVotes.map((userVote) => userVote.userId)
          );
          const isVoted = voteUsers.includes(Number(auth.id));

          return (
            <View key={vote.id} style={styles.vote}>
              {vote.options.map((option) => (
                <VoteOption
                  key={option.id}
                  option={option}
                  isVoted={isVoted}
                  totalCount={voteCount}
                  isSelected={option.id === selectedId}
                  onSelect={() => setSelectedId(Number(option.id))}
                />
              ))}
              {!isVoted && (
                <CommonButton
                  onPress={handleVote}
                  disabled={!selectedId}
                  label="투표하기"
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 8,
    padding: 16,
    gap: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  headerVoteCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  headerVoteCountText: {
    fontSize: 12,
    color: colors.BLACK,
    fontWeight: "bold",
  },
  content: {},
  vote: {
    gap: 8,
  },
  buttonContainer: {},
});
