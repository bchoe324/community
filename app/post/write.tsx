import CommonButton from "@/components/CommonButton";
import DescriptionInput from "@/components/DescriptionInput";
import ImagePreviewList from "@/components/ImagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";
import TitleInput from "@/components/TitleInput";
import useCreatePost from "@/hooks/queries/useCreatePost";
import { ImageUri } from "@/types";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface WriteFormType {
  title: string;
  description: string;
  imageUris: ImageUri[];
}

export default function WriteScreen() {
  const createPost = useCreatePost();
  const navigation = useNavigation();
  const writeForm = useForm<WriteFormType>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
    },
  });

  const handleSubmit = (data: WriteFormType) => {
    createPost.mutate(data);
  };

  console.log("postForm", writeForm.watch().imageUris);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CommonButton
          label="저장"
          variant="standard"
          size="medium"
          onPress={writeForm.handleSubmit(handleSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...writeForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <ImagePreviewList imageUris={writeForm.watch().imageUris} />
      </KeyboardAwareScrollView>
      <PostWriteFooter />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
