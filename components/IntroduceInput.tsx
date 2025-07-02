import { Controller, useFormContext } from "react-hook-form";
import CommonInput from "./CommonInput";

export default function IntroduceInput() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="introduce"
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <CommonInput
          ref={ref}
          label="소개"
          placeholder="소개를 입력하세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
          inputMode="text"
        />
      )}
    />
  );
}
