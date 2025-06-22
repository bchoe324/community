import { color } from "@/constants";
import { Post } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FeedProfile from "./FeedProfile";

export default function FeedItem({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FeedProfile
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          onPress={() => {}}
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuItem}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? color.ORANGE_600 : color.BLACK}
          />
          <Text
            style={[styles.menuItemText, isLiked && styles.activeMenuItemText]}
          >
            1
          </Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color={color.BLACK}
          />
          <Text style={styles.menuItemText}>1</Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="eye-outline" size={24} color={color.BLACK} />
          <Text style={styles.menuItemText}>1</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    gap: 14,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: color.BLACK,
  },
  description: {
    fontSize: 16,
    color: color.BLACK,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.GRAY_300,
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  menuItemText: {
    fontSize: 14,
    color: color.BLACK,
  },
  activeMenuItemText: {
    color: color.ORANGE_600,
  },
});
