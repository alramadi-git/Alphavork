"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/blocks/links";

export default function NotFound() {
  const tNotFound = useTranslations("app.authentication.not-found");

  return (
    <section className="space-y-6 text-center">
      <h2 className="text-5xl font-semibold">{tNotFound("subtitle")}</h2>
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-semibold">{tNotFound("title")}</h3>
        <p className="text-muted-foreground mx-auto max-w-sm">
          {tNotFound("description")}
        </p>
      </div>
      <Button asChild className="rounded-lg">
        <Link href="/authentication/login">{tNotFound("action.go-to-the-login-page")}</Link>
      </Button>
    </section>
  );
}
