"use client";

import { LinkPropsType } from "./types/link-props.type";

import { Link } from "./link";

import { SearchParamsLibrary } from "@/features2/url/libraries/search-params-library";

import { usePathname, useSearchParams } from "next/navigation";

export function LocaleLink(props: Omit<LinkPropsType, "href">) {
  const pathname = usePathname();

  const searchParams = new SearchParamsLibrary(useSearchParams().toString());

  const href = `${pathname}${searchParams.toString()}`;

  return <Link href={href} {...props} />;
}
