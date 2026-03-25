import { ImagePropsType } from "./types/image-props.type";

import { ImageType } from "./types/image.type";

import { FullHDImage } from "./full-hd-image";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function LogoImage({
  className,
  ...props
}: Omit<ImagePropsType, "src" | "alt">) {
  const logoImage: ImageType = useTranslations("components.images").raw("logo");

  return (
    <FullHDImage
      src={logoImage.url}
      alt={logoImage.alternate}
      className={cn("dark:invert", className)}
      {...props}
    />
  );
}
