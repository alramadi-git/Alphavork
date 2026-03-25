import { UndefinableType } from "@/common/types/nullish.type";

class SearchParamsLibrary extends URLSearchParams {
  public override toString(): string {
    const queryString = super.toString();
    return queryString.length === 0 ? "" : `?${queryString}`;
  }

  public override set(name: string, value?: string): void;
  public override set(name: string, value: string[]): void;
  public override set(
    name: string,
    valueOrValues: UndefinableType<string> | string[],
  ): void {
    if (valueOrValues === undefined) return;
    if (typeof valueOrValues === "string") {
      super.set(name, valueOrValues);
      return;
    }

    valueOrValues.forEach((item) => super.append(name, item));
  }

  public clear(): SearchParamsLibrary {
    return new SearchParamsLibrary();
  }
}

export { SearchParamsLibrary };
