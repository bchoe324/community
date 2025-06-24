import { Controller, useFormContext } from "react-hook-form";
import CommonInput from "./CommonInput";

export default function DescriptionInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="description"
      control={control}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <CommonInput
          label="내용"
          placeholder="내용을 입력하세요."
          multiline
          ref={ref}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
