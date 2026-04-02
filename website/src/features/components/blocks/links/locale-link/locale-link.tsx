"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { SearchParamsUtil } from "@/features/utils/search-params/search-params.util";

import { LinkPropsType } from "../types/link.props";

import { Link } from "../link/link";

export function LocaleLink(props: Omit<LinkPropsType, "href">) {
  const pathname = usePathname();

  const searchParams = new SearchParamsUtil(useSearchParams().toString());

  const href = `${pathname}${searchParams.toString()}`;

  return <Link {...props} href={href} />;
}
