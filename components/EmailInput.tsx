import { Controller, useFormContext } from "react-hook-form";
import CommonInput from "./CommonInput";

export default function EmailInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (
            !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
              data
            )
          ) {
            return "올바른 이메일 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CommonInput
          label="이메일"
          placeholder="이메일을 입력해주세요"
          keyboardType="email-address"
          submitBehavior="submit"
          returnKeyType="next"
          onSubmitEditing={() => {
            setFocus("password");
          }}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
