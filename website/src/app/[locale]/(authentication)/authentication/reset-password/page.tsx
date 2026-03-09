import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Forms from "@/components/templates/user/authentication/reset-password/page/forms/forms.";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (
    await getTranslations("app.user.authentication.reset-password.page")
  ).raw("metadata");
}

export default async function Page() {
  return <Forms />;
}
