import { LinkType } from "@/features/components/blocks/links/types/link.type";
import { DescriptiveLinkType } from "@/features/components/blocks/links/types/descriptive-link.type";

export type NavigationMenuType =
  | LinkType
  | {
      label: string;
      links: DescriptiveLinkType[];
    };
