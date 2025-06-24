import { Controller, useFormContext } from "react-hook-form";
import CommonInput from "./CommonInput";

export default function TitleInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="title"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CommonInput
          label="제목"
          placeholder="제목을 입력하세요."
          autoFocus
          submitBehavior="submit"
          returnKeyType="next"
          onSubmitEditing={() => setFocus("description")}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
