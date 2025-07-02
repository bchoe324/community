import { Controller, useFormContext } from "react-hook-form";
import CommonInput from "./CommonInput";

export default function NicknameInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      control={control}
      name="nickname"
      rules={{
        validate: (value) => {
          if (value.length < 2) {
            return "2자 이상 입력해주세요.";
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CommonInput
          label="닉네임"
          placeholder="닉네임을 입력하세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus("introduce")}
        />
      )}
    />
  );
}
