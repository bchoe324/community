import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      <Pressable
        style={styles.writeButton}
        onPress={() => router.push("/post/write")}
      >
        <Ionicons name="pencil" size={32} color={colors.WHITE} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  writeButton: {
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    position: "absolute",
    bottom: 16,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});
