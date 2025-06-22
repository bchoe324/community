import CommonButton from "@/components/CommonButton";
import { color } from "@/constants";
import { Link, useRouter } from "expo-router";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton
          label="로그인하기"
          onPress={() => router.push("/auth/login")}
        />
        <Link href="/auth/signup" style={styles.signupLink}>
          이메일로 가입하기
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 112,
    height: 112,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    gap: 20,
  },
  signupLink: {
    color: color.GRAY_700,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
