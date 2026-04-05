import "../globals.css";

import { Metadata } from "next";

import { EnvironmentEnum } from "@/common/enums/environment.enum";

import { cn } from "@/features/components/ui/utils/utils";

import { Roboto } from "next/font/google";

import { routing } from "@/features/i18n/routing";

import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";

import ThemeProvider from "@/features/components/providers/theme";
import { Toaster } from "@/features/components/ui/sonner";

import Script from "next/script";

const roboto = Roboto({
  weight: [
    "100" /** thin    */,
    "300" /** light   */,
    "400" /** normal  */,
    "500" /** medium  */,
    "700" /** bold    */,
    "900" /** black   */,
  ],
  subsets: ["latin"],
});

export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.layout")).raw("metadata");
}

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  const [tSettings, messages] = await Promise.all([
    getTranslations("settings"),
    getMessages(),
  ]);

  return (
    <html
      suppressHydrationWarning
      lang={tSettings("locale")}
      dir={tSettings("direction")}
    >
      <body className={cn(roboto.className, "antialiased")}>
        <NextIntlClientProvider
          locale={tSettings("locale")}
          messages={messages}
        >
          <ThemeProvider
            enableSystem
            disableTransitionOnChange
            attribute="class"
            defaultTheme="light"
          >
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </NextIntlClientProvider>
        {(process.env.NODE_ENV === EnvironmentEnum.Development ||
          process.env.NODE_ENV === EnvironmentEnum.Test) && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
