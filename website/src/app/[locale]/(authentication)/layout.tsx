import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { ReactNode, Fragment } from "react";

import Header from "@/components/templates/user/authentication/layout/header/header";
import Main from "@/components/templates/user/authentication/layout/main/main";
import Footer from "@/components/templates/user/authentication/layout/footer/footer";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.authentication.layout")).raw("metadata");
}

export default async function Layout({
  children,
}: LayoutProps<"/[locale]">): Promise<ReactNode> {
  return (
    <Fragment>
      <Header />
      <div className="authentication">
        <Main>{children}</Main>
      </div>
      <Footer />
    </Fragment>
  );
}
