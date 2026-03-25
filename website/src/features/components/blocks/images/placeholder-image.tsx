import { ImagePropsType } from "./types/image-props.type";

import { ImageType } from "./types/image.type";

import { FullHDImage } from "./full-hd-image";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function PlaceholderImage({
  className,
  ...props
}: Omit<ImagePropsType, "src" | "alt">) {
  const placeholderImage: ImageType =
    useTranslations("components.images").raw("placeholder");

  return (
    <FullHDImage
      src={placeholderImage.url}
      alt={placeholderImage.alternate}
      className={cn("dark:brightness-[0.2] dark:grayscale", className)}
      {...props}
    />
  );
}
