import CommonButton from "@/components/CommonButton";
import DescriptionInput from "@/components/DescriptionInput";
import ImagePreviewList from "@/components/ImagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import VoteModal from "@/components/VoteModal";
import useCreatePost from "@/hooks/queries/useCreatePost";
import { ImageUri, VoteOption } from "@/types";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface WriteFormType {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean;
  voteOptions: VoteOption[];
  isVoteAttached: boolean;
}

export default function WriteScreen() {
  const createPost = useCreatePost();
  const navigation = useNavigation();
  const writeForm = useForm<WriteFormType>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      voteOptions: [{ displayPriority: 0, content: "" }],
      // voteOptions id는 hook form에서 자동으로 생성되는 값이므로 따로 저장하지 않음
      isVoteAttached: false,
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
        <VoteAttached />
      </KeyboardAwareScrollView>
      <PostWriteFooter />
      <VoteModal />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
