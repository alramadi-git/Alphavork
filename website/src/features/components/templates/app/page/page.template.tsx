import { Fragment } from "react";

import HeroSection from "./hero/hero.section";

export default async function PageTemplate({}: PageProps<"/[locale]">) {
  return (
    <Fragment>
      <HeroSection />
    </Fragment>
  );
}
