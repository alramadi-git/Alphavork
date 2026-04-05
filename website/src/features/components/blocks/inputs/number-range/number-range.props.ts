export type NumberRangeProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  minProps?: {
    placeholder?: string;
    defaultValue?: number;
    onValueChange?(value?: number): void;
  };
  maxProps?: {
    placeholder?: string;
    defaultValue?: number;
    onValueChange?(value?: number): void;
  };
  formatter?(value?: number): string;
};
