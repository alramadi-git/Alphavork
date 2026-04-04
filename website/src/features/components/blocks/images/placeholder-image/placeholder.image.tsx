import { cn } from "@/features/components/ui/utils/utils";

import { useTranslations } from "next-intl";

import { ImageProps } from "../types/image.props";
import { ImageType } from "../types/image.type";

import { FullHDImage } from "../full-hd-image/full-hd.image";

export function PlaceholderImage({
  className,
  ...props
}: Omit<ImageProps, "src" | "alt">) {
  const placeholderImage: ImageType =
    useTranslations("components.images").raw("placeholder-image");

  return (
    <FullHDImage
      {...props}
      src={placeholderImage.url}
      alt={placeholderImage.alternate}
      className={cn("dark:brightness-[0.2] dark:grayscale", className)}
    />
  );
}
