"use client";

import { useTranslations } from "next-intl";

import { Placeholder } from "@/components/blocks/images";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/blocks/links";

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
        <Button asChild className="w-fit rounded-lg">
          <Link href="/">{tNotFound("go-back-to-home")}</Link>
        </Button>
      </div>
      <Placeholder className="max-lg:hidden" />
    </section>
  );
}
