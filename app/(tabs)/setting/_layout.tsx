import { color } from "@/constants";
import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: color.WHITE },
      }}
    >
      <Stack.Screen name="index" options={{ title: "설정" }} />
    </Stack>
  );
}
