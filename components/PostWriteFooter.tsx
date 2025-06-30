import { colors } from "@/constants";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostWriteFooter() {
  const inset = useSafeAreaInsets();
  const uploadImages = useUploadImages();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] });

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const formData = getFormDataImages("images", result.assets);

    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => {
        addImageUris(data);
      },
    });
  };

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert(
        "이미지 업로드 개수 초과",
        "이미지는 최대 5개 까지만 업로드 가능합니다."
      );
    }
    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri: uri }))]);
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerButton} onPress={handlePickImage}>
        <Ionicons name="camera" size={20} color={colors.BLACK} />
      </Pressable>
      <Pressable
        style={styles.footerButton}
        onPress={() => setValue("isVoteOpen", true)}
      >
        <MaterialCommunityIcons name="vote" size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
  footerButton: {
    padding: 4,
    backgroundColor: colors.GRAY_100,
    borderRadius: 4,
  },
});
