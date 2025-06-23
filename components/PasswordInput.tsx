import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import CommonInput from "./CommonInput";

interface Props {
  submitBehavior?: TextInputProps["submitBehavior"];
}

export default function PasswordInput({
  submitBehavior = "blurAndSubmit",
}: Props) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return "비밀번호는 8자 이상이어야 합니다.";
          }
        },
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <CommonInput
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
          textContentType="oneTimeCode"
          submitBehavior={submitBehavior}
          returnKeyType="next"
          onSubmitEditing={() => {
            setFocus("passwordConfirm");
          }}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
