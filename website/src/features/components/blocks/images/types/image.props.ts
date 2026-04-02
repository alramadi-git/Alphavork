import Image from "next/image";

import { ComponentProps } from "react";

export type ImageProps = Omit<ComponentProps<typeof Image>, "width" | "height">;
