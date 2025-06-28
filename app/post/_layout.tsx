import { colors } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import { Link, router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "글쓰기",
          headerLeft: () => (
            <Link href="/" replace>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: "수정",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
