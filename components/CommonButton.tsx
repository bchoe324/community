import { colors } from "@/constants";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium" | "large";
}

export default function Button({
  label,
  variant = "filled",
  size = "large",
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        props.disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {},
  small: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
  },
  outlined: {},
  standard: {},
  pressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {},
  standardText: {
    color: colors.ORANGE_600,
  },
});
