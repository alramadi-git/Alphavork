import { ReactNode } from "react";

export type NumberProps = {
  icon?: ReactNode;
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: number;
  onValueChange?(value?: number): void;
  formatter?(value?: number): string;
};
