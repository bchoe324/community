import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface WriteFormType {
  title: string;
  description: string;
}

export default function WriteScreen() {
  const writeForm = useForm<WriteFormType>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <View style={styles.container}>
      <FormProvider {...writeForm}>
        <TitleInput />
        <DescriptionInput />
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
