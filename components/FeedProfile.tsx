import { colors } from "@/constants";
import { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface FeedProfileProps {
  imageUri?: string;
  nickname: string;
  createdAt: string;
  option?: ReactNode;
  onPress: () => void;
}

export default function FeedProfile({
  imageUri,
  nickname,
  createdAt,
  option,
  onPress,
}: FeedProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  textContainer: {
    gap: 4,
  },
  nickname: {
    fontSize: 15,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});
