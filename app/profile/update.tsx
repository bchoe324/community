import { baseURLs } from "@/api/axios";
import CommonButton from "@/components/CommonButton";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import IntroduceInput from "@/components/IntroduceInput";
import NicknameInput from "@/components/NicknameInput";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type ProfileFormType = {
  nickname: string;
  introduce: string;
};

export default function ProfileUpdateScreen() {
  const { auth } = useAuth();
  const profileForm = useForm({
    defaultValues: {
      nickname: auth.nickname,
      introduce: auth.introduce,
    },
  });
  const { profileMutation } = useAuth();

  const handleSubmit = (formData: ProfileFormType) => {
    profileMutation.mutate(formData, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "저장되었습니다.",
        });
      },
    });
  };

  return (
    <FormProvider {...profileForm}>
      <View style={styles.profileImageContainer}>
        <Image
          source={
            auth.imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseURLs.ios : baseURLs.android
                  }/${auth.imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.profileImage}
        />
        <CommonButton
          label="아바타 변경"
          onPress={() => {}}
          variant="outlined"
          size="medium"
          style={{ position: "absolute", bottom: 0, right: 16 }}
        />
      </View>
      <View style={styles.formContainer}>
        <NicknameInput />
        <IntroduceInput />
      </View>
      <FixedBottomCTA
        label="저장"
        onPress={profileForm.handleSubmit(handleSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  profileImage: {
    width: 154,
    height: 154,
    borderRadius: 77,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  formContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
});
