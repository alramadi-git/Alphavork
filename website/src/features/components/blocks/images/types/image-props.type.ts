// eslint-disable-next-line no-restricted-imports
import Image from "next/image";

import { ComponentProps } from "react";

export type ImagePropsType = Omit<
  ComponentProps<typeof Image>,
  "width" | "height"
>;
