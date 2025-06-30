import { colors } from "@/constants";
import { VoteOption } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import VoteInput from "./VoteInput";

export default function VoteModal() {
  const { control, setValue } = useFormContext();
  const [isVoteOpen, voteOptions] = useWatch({
    control,
    name: ["isVoteOpen", "voteOptions"],
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (option: VoteOption) => option.displayPriority
    );
    const nextPriority = Math.max(...priorities) + 1;
    append({ displayPriority: nextPriority, content: "" });
  };

  const handleSubmit = () => {
    if (voteOptions.length < 2) {
      Alert.alert("투표 항목을 2개 이상 추가해주세요.");
      return;
    }
    setValue("voteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => setValue("isVoteOpen", false)}
            style={styles.headerLeft}
          >
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.headerRight}>첨부</Text>
          </Pressable>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
        >
          {fields.map((field, index) => (
            <VoteInput
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
          <Pressable onPress={handleAppendVote} style={styles.addVote}>
            <Feather name="plus" size={16} color={colors.GRAY_500} />
            <Text style={styles.addVoteText}>항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  addVote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.GRAY_500,
    textAlign: "center",
  },
});
