import { baseURLs } from "@/api/axios";
import AuthRoute from "@/components/AuthRoute";
import Tab from "@/components/Tab";
import UserFeedList from "@/components/UserFeedList";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetUserProfile from "@/hooks/queries/useGetUserProfile";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { id: userId } = useLocalSearchParams();
  const { auth } = useAuth();
  const { data: profile } = useGetUserProfile(Number(userId));
  const { nickname, introduce, imageUri } = profile || {};

  if (Number(auth.id) === Number(userId)) {
    <Redirect href="/my" />;
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, []);

  return (
    <AuthRoute>
      <View style={styles.profileContainer}>
        <Image
          source={
            imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseURLs.ios : baseURLs.android
                  }/${imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.profileImage}
        />
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.nickname}>{nickname}</Text>
        <Text>{introduce}</Text>
      </View>
      <View style={styles.tabContainer}>
        {["게시물"].map((item, index) => (
          <Tab key={index + item} isActive>
            {item}
          </Tab>
        ))}
      </View>
      <UserFeedList userId={Number(userId)} />
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
