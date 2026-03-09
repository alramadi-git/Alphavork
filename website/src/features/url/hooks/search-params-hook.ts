"use client";

import { useRouter, usePathname } from "@/features/i18n/navigation";
import { useSearchParams as useNextjsSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { UndefinableType, NullableType } from "@/types/nullish-type";

import { SearchParamsLibrary } from "@/features/url/libraries/search-params-library";

export function useSearchParamsHook() {
  const router = useRouter();

  const pathname = usePathname();
  const nextjsSearchParams = useNextjsSearchParams();

  const [searchParams, setSearchParams] = useState(
    new SearchParamsLibrary(nextjsSearchParams.toString()),
  );

  useEffect(() => {
    setSearchParams(new SearchParamsLibrary(nextjsSearchParams.toString()));
  }, [nextjsSearchParams]);

  function get(key: string): NullableType<string> {
    return searchParams.get(key);
  }

  function getAll(key: string): string[] {
    return searchParams.getAll(key);
  }

  function set(key: string, value?: string): void;
  function set(key: string, values: string[]): void;
  function set(
    key: string,
    valueOrValues: UndefinableType<string> | string[],
  ): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams.set(key, valueOrValues);
  }

  function _delete(key: string): void {
    searchParams.delete(key);
  }

  function clear(): void {
    const newSearchParams = searchParams.clear();
    setSearchParams(newSearchParams);
  }

  function apply(): void {
    router.push(`${pathname}${searchParams.toString()}`);
  }

  return {
    get,
    getAll,
    set,
    delete: _delete,
    clear,
    apply,
  };
}
