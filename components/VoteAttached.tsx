import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, View } from "react-native";
import CommonInput from "./CommonInput";

export default function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({
    control,
    name: ["isVoteAttached"],
  });

  const handleRemoveVote = () => {
    setValue("isVoteAttached", false);
    resetField("voteOptions");
  };

  return (
    <>
      {isVoteAttached && (
        <View>
          <CommonInput
            editable={false}
            variant="outlined"
            value="투표가 첨부되었습니다."
            rightChild={
              <Pressable onPress={handleRemoveVote}>
                <Ionicons name="close" size={20} color={colors.BLACK} />
              </Pressable>
            }
          />
        </View>
      )}
    </>
  );
}
