import { Link as I18NLink } from "@/features/i18n/navigation";

import { LinkProps } from "../types/link.props";

export function Link(props: LinkProps) {
  return <I18NLink {...props} />;
}
