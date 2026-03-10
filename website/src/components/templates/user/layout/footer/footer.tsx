import { getTranslations } from "next-intl/server";

import {
  IconCopyright,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandMeta,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";

import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/blocks/images";
import { Link } from "@/components/blocks/links";

type tMenu = {
  label: string;
  links: {
    url: string;
    label: string;
  }[];
};

export default async function Footer() {
  const tFooter = await getTranslations("app.user.layout.footer");

  const menus: tMenu[] = tFooter.raw("menus");

  return (
    <footer className="dark section bg-background text-foreground">
      <div className="container space-y-6">
        <div className="grid gap-12 md:grid-cols-8">
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <Logo className="size-8" />
              <h3 className="text-2xl font-semibold">{tFooter("title")}</h3>
            </div>
            <p className="text-muted-foreground">{tFooter("description")}</p>
          </div>
          <div className="xs:grid-cols-2 grid gap-6 md:col-span-4 lg:grid-cols-3">
            {menus.map((menu) => (
              <div key={menu.label} className="space-y-4">
                <p className="block font-medium">{menu.label}</p>
                <ul className="space-y-1">
                  {menu.links.map((link) => (
                    <li key={link.url}>
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
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-6">
          <small className="text-muted-foreground flex items-center gap-1 text-sm">
            <IconCopyright className="size-3" />
            {tFooter("copyrights")}
          </small>
          <div className="flex justify-center gap-3.5">
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
      </div>
    </footer>
  );
}
