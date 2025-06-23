import EmailInput from "@/components/EmailInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import PasswordInput from "@/components/PasswordInput";
import useAuth from "@/hooks/queries/useAuth";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type loginFormType = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();

  const loginForm = useForm<loginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: loginFormType) => {
    const { email, password } = data;
    loginMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="로그인하기"
        onPress={loginForm.handleSubmit(handleSubmit)}
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
