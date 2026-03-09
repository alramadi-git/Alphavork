import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/blocks/images";
import { Link } from "@/components/blocks/links";

export default async function Header() {
  const tHeader = await getTranslations("app.authentication.layout.header");

  return (
    <header className="container py-8">
      <Link href="/" className="flex items-center gap-3">
        <Logo priority className="size-8" />
        <h2 className="text-2xl font-bold">{tHeader("organization")}</h2>
      </Link>
    </header>
  );
}
