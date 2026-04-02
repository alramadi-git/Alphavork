import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

import { ImageProps } from "../types/image.props";
import { ImageType } from "../types/image.type";

import { FullHDImage } from "../full-hd-image/full-hd.image";

export function NotFoundImage({
  className,
  ...props
}: Omit<ImageProps, "width" | "height" | "src" | "alt">) {
  const notFoundImage: ImageType =
    useTranslations("components.images").raw("not-found-image");

  return (
    <FullHDImage
      {...props}
      src={notFoundImage.url}
      alt={notFoundImage.alternate}
      className={cn("bg-foreground", className)}
    />
  );
}
