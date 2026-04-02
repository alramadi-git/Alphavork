import { UndefinableType } from "@/common/types/undefinable.type";

export class SearchParamsUtil extends URLSearchParams {
  public override set(name: string, value: UndefinableType<string>): void {
    if (value === undefined) {
      return;
    }

    super.set(name, value);
  }

  public setMany(name: string, values: string[]): void {
    values.forEach((item) => super.append(name, item));
  }

  public override toString(): string {
    const queryString = super.toString();
    return queryString.length === 0 ? "" : `?${queryString}`;
  }
}
