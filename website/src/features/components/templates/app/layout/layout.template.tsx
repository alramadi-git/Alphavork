import { Fragment } from "react";

import Header from "@/features/components/templates/app/layout/header/header";
import Footer from "@/features/components/templates/app/layout/footer/footer";

export default async function LayoutTemplate({
  children,
}: LayoutProps<"/[locale]">) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
