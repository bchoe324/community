import { colors } from "@/constants";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CommonInputProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outlined";
  error?: string;
  rightChild?: ReactNode;
}

function CommonInput(
  { label, variant = "filled", error, rightChild, ...props }: CommonInputProps,
  ref?: ForwardedRef<TextInput>
) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          styles[variant],
          Boolean(error) && styles.errorInput,
          props.multiline && styles.multiline,
        ]}
      >
        <TextInput
          {...props}
          ref={ref}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          style={[styles.input, styles[`${variant}Text`]]}
          placeholderTextColor={colors.GRAY_500}
        />
        {rightChild}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
  inputWrapper: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  multiline: {
    height: 200,
    alignItems: "flex-start",
    paddingVertical: 5,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  standardText: {
    color: colors.BLACK,
  },
  filledText: {
    color: colors.BLACK,
  },
  outlinedText: {
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  errorInput: {
    backgroundColor: colors.RED_100,
  },
  error: {
    fontSize: 12,
    color: colors.RED_500,
    marginTop: 5,
  },
});

export default forwardRef(CommonInput);
