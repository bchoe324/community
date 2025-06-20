import { color } from "@/constants";
import { Stack } from "expo-router";

export default function MyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: color.WHITE },
      }}
    >
      <Stack.Screen name="index" options={{ title: "내 프로필" }} />
    </Stack>
  );
}
