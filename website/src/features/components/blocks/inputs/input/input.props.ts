import { ReactNode } from "react";

export type InputProps = {
  icon?: ReactNode;
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  type?: "text" | "search" | "tel" | "email" | "password";
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onFocus?(): void;
  onKeyDown?(key: string): void;
  onValueChange?(value: string): void;
  onBlur?(): void;
};
