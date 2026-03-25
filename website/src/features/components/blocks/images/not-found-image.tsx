import { ImagePropsType } from "./types/image-props.type";

import { ImageType } from "./types/image.type";

import { FullHDImage } from "./full-hd-image";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function NotFoundImage({
  className,
  ...props
}: Omit<ImagePropsType, "width" | "height" | "src" | "alt">) {
  const notFoundImage: ImageType =
    useTranslations("components.images").raw("not-found");

  return (
    <FullHDImage
      src={notFoundImage.url}
      alt={notFoundImage.alternate}
      className={cn("bg-foreground", className)}
      {...props}
    />
  );
}
