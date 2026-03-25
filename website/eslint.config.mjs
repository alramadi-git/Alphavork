import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // "@typescript-eslint/no-empty-object-type": "off",
      // "@typescript-eslint/no-unused-vars": "warn",
      // "@typescript-eslint/no-explicit-any": "warn",
      // "prefer-const": "warn",
      "no-restricted-imports": [
        "error",
        /** Theme Provider */
        {
          name: "next-themes",
          importNames: ["ThemeProvider"],
          message:
            "Please import from `@/features/components/providers/theme-provider` instead.",
        },
        /** Images */
        {
          name: "next/image",
          message:
            "Please import HDImage or FullHDImage from `@/features/components/blocks/images` instead.",
        },
        /** Next Intl */
        {
          name: "next/link",
          message:
            "Please import from `@/features/components/locals/blocks/links` instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/i18n/navigation` instead.",
        },
        {
          name: "@/i18n/navigation",
          importNames: ["Link"],
          message:
            "Please import from `@/features/components/locals/blocks/links` instead.",
        },
      ],
    },
  },
];

export default eslintConfig;
