import { getTranslations } from "next-intl/server";

import { Link } from "@/features/components/blocks/links/link";
import { LinkType } from "@/features/components/blocks/links/types/link.type";

export default async function Footer() {
  const tFooter = await getTranslations("app.layout.footer");

  const links: LinkType[] = tFooter.raw("links");

  return (
    <footer className="section dark bg-background text-foreground">
      <div className="container flex items-center justify-between">
        <small className="text-muted-foreground">{tFooter("copyrights")}</small>
        <ul className="flex items-center gap-3">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url}
                className="text-muted-foreground hover:text-primary text-sm duration-150 hover:underline"
              >
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
