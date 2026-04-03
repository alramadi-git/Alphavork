import { ContinentType } from "../types/continent.type";

export const continents: ContinentType[] = [
  {
    value: "0",
    label: "Africa",
    options: [
      {
        value: "العربية (المغرب)",
        direction: "rtl",
        locale: "ar-MA",
        flag: "🇲🇦",
        label: "العربية (المغرب)",
      },
      {
        value: "English (Nigeria)",
        direction: "ltr",
        locale: "en-NG",
        flag: "🇳🇬",
        label: "English (Nigeria)",
      },
      {
        value: "English (South Africa)",
        direction: "ltr",
        locale: "en-ZA",
        flag: "🇿🇦",
        label: "English (South Africa)",
      },
    ],
  },
  {
    value: "1",
    label: "America",
    options: [
      {
        value: "English (Canada)",
        direction: "ltr",
        locale: "en-CA",
        flag: "🇨🇦",
        label: "English (Canada)",
      },
      {
        value: "Español (México)",
        direction: "ltr",
        locale: "es-MX",
        flag: "🇲🇽",
        label: "Español (México)",
      },
      {
        value: "English (United States)",
        direction: "ltr",
        locale: "en-US",
        flag: "🇺🇸",
        label: "English (United States)",
      },
    ],
  },
  {
    value: "2",
    label: "Asia",
    options: [
      {
        value: "中文 (中国)",
        direction: "ltr",
        locale: "zh-CN",
        flag: "🇨🇳",
        label: "中文 (中国)",
      },
      {
        value: "हिन्दी (भारत)",
        direction: "ltr",
        locale: "hi-IN",
        flag: "🇮🇳",
        label: "हिन्दी (भारत)",
      },
      {
        value: "日本語 (日本)",
        direction: "ltr",
        locale: "ja-JP",
        flag: "🇯🇵",
        label: "日本語 (日本)",
      },
      {
        value: "العربية (المملكة العربية السعودية)",
        direction: "rtl",
        locale: "ar-SA",
        flag: "🇸🇦",
        label: "العربية (المملكة العربية السعودية)",
      },
    ],
  },
  {
    value: "3",
    label: "Europe",
    options: [
      {
        value: "Français (France)",
        direction: "ltr",
        locale: "fr-FR",
        flag: "🇫🇷",
        label: "Français (France)",
      },
      {
        value: "Deutsch (Deutschland)",
        direction: "ltr",
        locale: "de-DE",
        flag: "🇩🇪",
        label: "Deutsch (Deutschland)",
      },
      {
        value: "English (United Kingdom)",
        direction: "ltr",
        locale: "en-GB",
        flag: "🇬🇧",
        label: "English (United Kingdom)",
      },
    ],
  },
  {
    value: "4",
    label: "Oceania",
    options: [
      {
        value: "English (Australia)",
        direction: "ltr",
        locale: "en-AU",
        flag: "🇦🇺",
        label: "English (Australia)",
      },
      {
        value: "English (New Zealand)",
        direction: "ltr",
        locale: "en-NZ",
        flag: "🇳🇿",
        label: "English (New Zealand)",
      },
    ],
  },
];
