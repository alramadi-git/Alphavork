import Languages from "@/features/components/blocks/languages/languages";

import { Separator } from "@/features/components/ui/separator";

import { LogoImage } from "@/features/components/blocks/images/logo-image";

import { Link } from "@/features/components/blocks/links/link";

export default async function Header() {
  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/">
            <LogoImage className="size-10" />
          </Link>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-8"
          />
          <div className="grow">
            <div className="w-fit">
              <Languages />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
