export type EmailProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
};
