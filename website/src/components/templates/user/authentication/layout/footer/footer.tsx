import { getTranslations } from "next-intl/server";

import {
  IconCopyright,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandMeta,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";

import Languages from "@/components/blocks/languages";

import { Link } from "@/components/blocks/links";

export default async function Footer() {
  const tFooter = await getTranslations("app.authentication.layout.footer");

  return (
    <footer className="section border-t">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex grow flex-wrap items-center justify-between gap-6">
          <small className="text-muted-foreground flex items-center gap-1 text-sm">
            <IconCopyright className="size-3" />
            {tFooter("copyrights")}
          </small>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/in/alramadi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary size-6 duration-150"
            >
              <IconBrandLinkedin />
            </Link>
            <Link
              href="https://x.com/alramadime"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary size-6 duration-150"
            >
              <IconBrandX />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61573458518133"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary size-6 duration-150"
            >
              <IconBrandMeta />
            </Link>
            <Link
              href="https://www.instagram.com/alramadi.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary size-6 duration-150"
            >
              <IconBrandInstagram />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCfCD1u77qXfcjHGK9Kn8ZYA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="text-muted-foreground hover:text-primary size-6 duration-150"
            >
              <IconBrandYoutube />
            </Link>
          </div>
        </div>
        <div>
          <div className="hidden md:block">
            <Languages align="end" />
          </div>
          <div className="md:hidden">
            <Languages align="start" />
          </div>
        </div>
      </div>
    </footer>
  );
}
