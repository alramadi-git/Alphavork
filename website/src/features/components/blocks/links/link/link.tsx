import { Link as I18NLink } from "@/features/i18n/navigation";

import { LinkPropsType } from "../types/link.props";

export function Link(props: LinkPropsType) {
  return <I18NLink {...props} />;
}
