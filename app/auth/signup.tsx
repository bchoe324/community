import PasswordConfirmInput from "@/components/\bPasswordConfirmInput";
import EmailInput from "@/components/EmailInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import PasswordInput from "@/components/PasswordInput";
import useAuth from "@/hooks/queries/useAuth";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type signupFormType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const { signupMutation } = useAuth();

  const signupForm = useForm<signupFormType>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = (data: signupFormType) => {
    const { email, password } = data;
    signupMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label="회원가입하기"
        onPress={signupForm.handleSubmit(handleSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
