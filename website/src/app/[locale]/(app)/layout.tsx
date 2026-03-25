import { Fragment } from "react";

import Header from "@/features/components/templates/app/layout/header/header";
import Footer from "@/features/components/templates/app/layout/footer/footer";

export const dynamic = "force-static";

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
