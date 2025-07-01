import { colors } from "@/constants";
import { PostVoteOption } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface VoteOptionProps {
  option: PostVoteOption;
  isVoted: boolean;
  totalCount: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function VoteOption({
  option,
  isVoted,
  totalCount,
  isSelected,
  onSelect,
}: VoteOptionProps) {
  const percent = option.userVotes.length
    ? Math.floor((option.userVotes.length / totalCount) * 100)
    : 0;

  return isVoted ? (
    <View style={[styles.voteOption, styles.votedOption]}>
      <View style={[styles.votedPercentBar, { width: `${percent}%` }]} />
      <Text style={styles.voteOptionText}>{option.content}</Text>
      <Text style={styles.votedPercentText}>
        {percent}% ({option.userVotes.length})
      </Text>
    </View>
  ) : (
    <Pressable
      onPress={onSelect}
      style={[
        styles.voteOption,
        styles.unvotedOption,
        isSelected && styles.selected,
      ]}
    >
      <Text style={styles.voteOptionText}>{option.content}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  voteOption: {
    borderRadius: 8,
  },
  voteOptionText: {
    fontSize: 14,
    color: colors.BLACK,
    marginLeft: 10,
    marginVertical: 10,
  },
  votedOption: {
    backgroundColor: colors.ORANGE_200,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  votedPercentBar: {
    backgroundColor: colors.ORANGE_300,
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  votedPercentText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.BLACK,
    marginRight: 10,
  },
  unvotedOption: {
    borderWidth: 1,
    borderColor: colors.GRAY_300,
  },
  selected: {
    borderColor: colors.ORANGE_600,
  },
});
