import CommonButton from "@/components/CommonButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import useGetPost from "@/hooks/queries/useGetPost";
import useUpdatePost from "@/hooks/queries/useUpdatePost";
import { ImageUri } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface updateFormType {
  title: string;
  description: string;
  imageUris: ImageUri[];
}

export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data } = useGetPost(Number(id));
  const updatePost = useUpdatePost();

  const navigation = useNavigation();
  const updateForm = useForm<updateFormType>({
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      imageUris: data?.imageUris ?? [],
    },
  });

  const handleSubmit = (data: updateFormType) => {
    updatePost.mutate({
      id: Number(id),
      body: data,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CommonButton
          label="저장"
          variant="standard"
          size="medium"
          onPress={updateForm.handleSubmit(handleSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...updateForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
