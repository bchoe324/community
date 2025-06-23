import { Controller, useFormContext } from "react-hook-form";
import CommonInput from "./CommonInput";

export default function PasswordInput() {
  const { control } = useFormContext();
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
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CommonInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
