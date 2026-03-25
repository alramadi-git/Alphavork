// eslint-disable-next-line no-restricted-imports
import { Link as I18NLink } from "@/features/i18n/navigation";

import { LinkPropsType } from "./types/link-props.type";

export function Link(props: LinkPropsType) {
  return <I18NLink {...props} />;
}
