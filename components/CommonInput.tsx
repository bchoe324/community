import { color } from "@/constants";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CommonInputProps extends TextInputProps {
  label: string;
  variation?: "filled" | "standard" | "outlined";
}

export default function CommonInput({
  label,
  variation = "filled",
  ...props
}: CommonInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, styles[variation]]}>
        <TextInput
          {...props}
          style={[styles.input]}
          placeholderTextColor={color.GRAY_500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 12,
    color: color.GRAY_700,
    marginBottom: 5,
  },
  inputWrapper: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  filled: {
    backgroundColor: color.GRAY_100,
  },
  standard: {},
  outlined: {},
  input: {
    flex: 1,
    color: color.BLACK,
    fontSize: 14,
  },
});
