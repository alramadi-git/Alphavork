"use client";

import { ComponentProps } from "react";

// eslint-disable-next-line no-restricted-imports
import { ThemeProvider as NextThemesProvider } from "next-themes";

type tThemeProviderProps = ComponentProps<typeof NextThemesProvider>;
export default function ThemeProvider({
  children,
  ...props
}: tThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
