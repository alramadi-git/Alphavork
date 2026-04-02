export type InputRef = {
  setValue(value: string): void;
  reset(defaultValue?: string): void;
  focus(): void;
  blur(): void;
};
