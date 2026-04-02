import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

import { ImageProps } from "../types/image.props";
import { ImageType } from "../types/image.type";

import { FullHDImage } from "../full-hd-image/full-hd.image";

export function LogoImage({
  className,
  ...props
}: Omit<ImageProps, "src" | "alt">) {
  const logoImage: ImageType =
    useTranslations("components.images").raw("logo-image");

  return (
    <FullHDImage
      {...props}
      src={logoImage.url}
      alt={logoImage.alternate}
      className={cn("dark:invert", className)}
    />
  );
}
