import EmailInput from "@/components/EmailInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import PasswordInput from "@/components/PasswordInput";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type loginFormType = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const loginForm = useForm<loginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: loginFormType) => {
    console.log(data);
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="회원가입하기"
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
