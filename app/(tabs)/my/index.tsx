import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function MyScreen() {
  const router = useRouter();

  useFocusEffect(() => {
    router.replace("/auth");
  });
  return (
    <SafeAreaView>
      <Text>내 프로필</Text>
    </SafeAreaView>
  );
}
