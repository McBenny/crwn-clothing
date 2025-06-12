import { InputHTMLAttributes, FC } from "react";
import { FormInputLabel, Group, Input } from "./form-input.styles";

type FormInputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps}) => {
  return (
    <Group>
      <Input {...otherProps}></Input>
      {label && (
        <FormInputLabel
          htmlFor={otherProps?.id}
          shrink={Boolean(typeof otherProps.value === 'string' && otherProps.value?.length)}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}

export default FormInput
