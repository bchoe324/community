import { colors } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface FeedProfileProps {
  imageUri?: string;
  nickname: string;
  createdAt: string;
  option?: ReactNode;
  onPress: () => void;
  isReply?: boolean;
}

export default function FeedProfile({
  imageUri,
  nickname,
  createdAt,
  option,
  onPress,
  isReply = false,
}: FeedProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={colors.BLACK}
          />
        )}
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
