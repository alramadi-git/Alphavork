import { ContinentType } from "../types/continent.type";

export const continents: ContinentType[] = [
  {
    label: "Africa",
    countries: [
      {
        direction: "rtl",
        locale: "ar-MA",
        flag: "🇲🇦",
        label: "العربية (المغرب)",
      },
      {
        direction: "ltr",
        locale: "en-NG",
        flag: "🇳🇬",
        label: "English (Nigeria)",
      },
      {
        direction: "ltr",
        locale: "en-ZA",
        flag: "🇿🇦",
        label: "English (South Africa)",
      },
    ],
  },
  {
    label: "America",
    countries: [
      {
        direction: "ltr",
        locale: "en-CA",
        flag: "🇨🇦",
        label: "English (Canada)",
      },
      {
        direction: "ltr",
        locale: "es-MX",
        flag: "🇲🇽",
        label: "Español (México)",
      },
      {
        direction: "ltr",
        locale: "en-US",
        flag: "🇺🇸",
        label: "English (United States)",
      },
    ],
  },
  {
    label: "Asia",
    countries: [
      {
        direction: "ltr",
        locale: "zh-CN",
        flag: "🇨🇳",
        label: "中文 (中国)",
      },
      {
        direction: "ltr",
        locale: "hi-IN",
        flag: "🇮🇳",
        label: "हिन्दी (भारत)",
      },
      {
        direction: "ltr",
        locale: "ja-JP",
        flag: "🇯🇵",
        label: "日本語 (日本)",
      },
      {
        direction: "rtl",
        locale: "ar-SA",
        flag: "🇸🇦",
        label: "العربية (المملكة العربية السعودية)",
      },
    ],
  },
  {
    label: "Europe",
    countries: [
      {
        direction: "ltr",
        locale: "fr-FR",
        flag: "🇫🇷",
        label: "Français (France)",
      },
      {
        direction: "ltr",
        locale: "de-DE",
        flag: "🇩🇪",
        label: "Deutsch (Deutschland)",
      },
      {
        direction: "ltr",
        locale: "en-GB",
        flag: "🇬🇧",
        label: "English (United Kingdom)",
      },
    ],
  },
  {
    label: "Oceania",
    countries: [
      {
        direction: "ltr",
        locale: "en-AU",
        flag: "🇦🇺",
        label: "English (Australia)",
      },
      {
        direction: "ltr",
        locale: "en-NZ",
        flag: "🇳🇿",
        label: "English (New Zealand)",
      },
    ],
  },
];
