export type PhoneNumberProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  defaultValue?: string;
  onValueChange?(value: string): void;
};
