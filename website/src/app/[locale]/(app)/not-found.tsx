"use client";

import { useTranslations } from "next-intl";

import { NotFoundImage } from "@/features/components/blocks/images/not-found-image/not-found.image";

import { Button } from "@/features/components/ui/button";
import { Link } from "@/features/components/blocks/links/link";

export default function NotFound() {
  const tNotFound = useTranslations("app.not-found");

  return (
    <section className="section h-fullscreen container grid grid-cols-1 items-center lg:grid-cols-2">
      <div className="space-y-6 text-center">
        <h2 className="text-5xl font-semibold">{tNotFound("subtitle")}</h2>
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">{tNotFound("title")}</h3>
          <p className="text-muted-foreground mx-auto max-w-sm">
            {tNotFound("description")}
          </p>
        </div>
        <Button asChild className="w-fit rounded">
          <Link href={tNotFound("go-back-to-home.url")}>
            {tNotFound("go-back-to-home.label")}
          </Link>
        </Button>
      </div>
      <NotFoundImage className="rounded max-lg:hidden" />
    </section>
  );
}
