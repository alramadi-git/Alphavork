"use client";

import { ComponentProps } from "react";

import { SearchParamsLibrary } from "@/features/url/libraries/search-params-library";

import { useSearchParams } from "next/navigation";

// eslint-disable-next-line no-restricted-imports
import { usePathname, Link as I18NLink } from "@/features/i18n/navigation";

type tLinkProps = ComponentProps<typeof I18NLink>;

export function Link(props: tLinkProps) {
  return <I18NLink {...props} />;
}

export function LinkLocale(props: Omit<tLinkProps, "href">) {
  const pathname = usePathname();
  const searchParams = new SearchParamsLibrary(useSearchParams().toString());

  const href = `${pathname}${searchParams.toString()}`;
  return <Link href={href} {...props} />;
}
