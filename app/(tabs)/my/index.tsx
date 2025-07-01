import { baseURLs } from "@/api/axios";
import AuthRoute from "@/components/AuthRoute";
import CommonButton from "@/components/CommonButton";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function MyScreen() {
  const { auth } = useAuth();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <AuthRoute>
      <View style={styles.profileContainer}>
        <Image
          source={
            auth.imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseURLs.ios : baseURLs.android
                  }/${auth.imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.profileImage}
        />
        <CommonButton
          style={{ position: "absolute", bottom: 16, right: 16 }}
          label="프로필 수정"
          variant="outlined"
          size="medium"
        />
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.nickname}>{auth.nickname}</Text>
        <Text>{auth.introduce}</Text>
      </View>
      <View style={styles.tabContainer}>
        {["게시물", "좋아한 게시물"].map((item, index) => (
          <Tab
            key={index + item}
            isActive={index === activeTabIndex}
            onPressTab={() => setActiveTabIndex(index)}
          >
            {item}
          </Tab>
        ))}
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    height: 154,
  },
  profileImage: {
    width: 154,
    height: 154,
    borderRadius: 77,
    position: "absolute",
    top: 77,
    left: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  profileInfoContainer: {
    marginTop: 77,
    padding: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
  },
});
