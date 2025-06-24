import { color } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import { Link, Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: color.BLACK,
        contentStyle: {
          backgroundColor: color.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "글쓰기",
          headerLeft: () => (
            <Link href="/" replace>
              <Feather name="arrow-left" size={28} color={color.BLACK} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
