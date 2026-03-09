import "../globals.css";

import { Metadata } from "next";

import { environmentEnum } from "@/enums/environment-enum";

import { cn } from "@/lib/utils";

import { Cairo } from "next/font/google";

import { routing } from "@/features/i18n/routing";

import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";

// import { DirectionProvider, TextDirection } from "@base-ui/react";
import ThemeProvider from "@/components/providers/theme";
import { Toaster } from "@/components/ui/sonner";

import Script from "next/script";

const cairo = Cairo({
  weight: [
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
      <body className={cn(cairo.className, "antialiased")}>
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

        {(process.env.NODE_ENV === environmentEnum.development ||
          process.env.NODE_ENV === environmentEnum.test) && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
