import NavigationMenu from "./navigation-menu";

import { Separator } from "@/features/components/ui/separator";

import { LogoImage } from "@/features/components/blocks/images/logo-image/logo.image";

import Languages from "@/features/components/blocks/languages/languages";

import { Link } from "@/features/components/blocks/links/link/link";

export default async function Header() {
  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b shadow-lg">
      <div className="container space-y-1.5 p-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <LogoImage className="size-12" />
          </Link>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-10"
          />
          <div className="grow">
            <div className="w-fit">
              <Languages />
            </div>
          </div>
        </div>
        <Separator />
        <NavigationMenu />
      </div>
    </header>
  );
}
