import Languages from "@/components/blocks/languages";

import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/blocks/images";
import { Link } from "@/components/blocks/links";

export default async function Header() {
  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/">
            <Logo className="size-10" />
          </Link>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-8"
          />
          <div className="grow">
            <div className="w-64">
              <Languages />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
