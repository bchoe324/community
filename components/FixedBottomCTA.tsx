import { colors } from "@/constants";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommonButton from "./CommonButton";

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

export default function FixedBottomCTA({
  onPress,
  label,
}: FixedBottomCTAProps) {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.buttonContainer, { bottom: inset.bottom || 12 }]}>
      <CommonButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
});
