import { baseURLs } from "@/api/axios";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

interface ImagePreviewListProps {
  imageUris: ImageUri[];
}

export default function ImagePreviewList({ imageUris }: ImagePreviewListProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${
          Platform.OS === "ios" ? baseURLs.ios : baseURLs.android
        }/${uri}`;
        return (
          <Pressable
            key={uri + index}
            onPress={() =>
              router.push({
                pathname: "/image",
                params: { uri: imageUri },
              })
            }
          >
            <Image style={styles.image} source={{ uri: imageUri }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
});
