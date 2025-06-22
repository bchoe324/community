import CommonButton from "@/components/CommonButton";
import { useRouter } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>피드</Text>
      <CommonButton
        label="버튼"
        onPress={() => {
          router.push("/auth");
        }}
      />
    </SafeAreaView>
  );
}
