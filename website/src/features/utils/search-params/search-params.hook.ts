"use client";

import { useState } from "react";

import { useRouter, usePathname } from "@/features/i18n/navigation";
import { useSearchParams } from "next/navigation";

import { UndefinableType } from "@/common/types/undefinable.type";
import { NullableType } from "@/common/types/nullable.type";

import { SearchParamsUtil } from "@/features/utils/search-params/search-params.util";

export function useSearchParamsHook() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchParamsUtil, setSearchParamsUtil] = useState(
    new SearchParamsUtil(searchParams.toString()),
  );

  function get(key: string): NullableType<string> {
    return searchParamsUtil.get(key);
  }

  function getAll(key: string): string[] {
    return searchParamsUtil.getAll(key);
  }

  function set(key: string, value: UndefinableType<string>): void {
    searchParamsUtil.set(key, value);
  }

  function setMany(key: string, values: string[]): void {
    searchParamsUtil.setMany(key, values);
  }

  function _delete(key: string): void {
    searchParamsUtil.delete(key);
  }

  function clear(): void {
    setSearchParamsUtil(new SearchParamsUtil());
  }

  function apply(): void {
    router.push(`${pathname}${searchParamsUtil.toString()}`);
  }

  return {
    get,
    getAll,
    set,
    setMany,
    delete: _delete,
    clear,
    apply,
  };
}
