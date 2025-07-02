import { colors } from "@/constants";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface TabProps {
  children: ReactNode;
  isActive: boolean;
  onPressTab?: () => void;
}

export default function Tab({ children, isActive, onPressTab }: TabProps) {
  return (
    <Pressable
      style={[styles.tab, isActive && styles.active]}
      onPress={onPressTab}
    >
      <Text style={[styles.tabText, isActive && styles.activeText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: colors.WHITE,
    borderBottomWidth: 2,
    borderBottomColor: colors.WHITE,
  },
  active: {
    borderBottomColor: colors.BLACK,
  },
  tabText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  activeText: {
    color: colors.BLACK,
    fontWeight: "bold",
  },
});
