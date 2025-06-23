import { color } from "@/constants";
import { ForwardedRef, forwardRef } from "react";
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
  error?: string;
}

function CommonInput(
  { label, variation = "filled", error, ...props }: CommonInputProps,
  ref?: ForwardedRef<TextInput>
) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          styles[variation],
          Boolean(error) && styles.errorInput,
        ]}
      >
        <TextInput
          {...props}
          ref={ref}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          style={[styles.input]}
          placeholderTextColor={color.GRAY_500}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
  errorInput: {
    backgroundColor: color.RED_100,
  },
  error: {
    fontSize: 12,
    color: color.RED_500,
    marginTop: 5,
  },
});

export default forwardRef(CommonInput);
