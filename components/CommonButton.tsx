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
      ]}
    >
      <Text style={[styles.label, styles[variant]]}>{label}</Text>
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
    color: colors.WHITE,
  },
  outlined: {},
  standard: {
    color: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
