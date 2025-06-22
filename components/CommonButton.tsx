import { color } from "@/constants";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  label: string;
  variation?: "filled" | "outlined" | "standard";
  size?: "small" | "medium" | "large";
}

export default function Button({
  label,
  variation = "filled",
  size = "large",
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.container,
        styles[variation],
        styles[size],
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
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
  default: {},
  filled: {
    backgroundColor: color.ORANGE_600,
  },
  outlined: {},
  standard: {},
  pressed: {
    opacity: 0.5,
  },
  label: {
    color: color.WHITE,
    fontSize: 14,
    fontWeight: "600",
  },
});
