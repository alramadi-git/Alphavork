import { ComponentProps } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

// eslint-disable-next-line no-restricted-imports
import Image from "next/image";

type tImageProps = Omit<ComponentProps<typeof Image>, "width" | "height">;
type tImage = {
  url: string;
  alternate: string;
};

function HDImage(props: tImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1280" height="720" />;
}

function FullHDImage(props: tImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1920" height="1080" />;
}

function Placeholder({
  className,
  ...props
}: Omit<tImageProps, "src" | "alt">) {
  const placeholder: tImage =
    useTranslations("components.images").raw("placeholder");
  return (
    <FullHDImage
      src={placeholder.url}
      alt={placeholder.alternate}
      className={cn("dark:brightness-[0.2] dark:grayscale", className)}
      {...props}
    />
  );
}

function Logo({ className, ...props }: Omit<tImageProps, "src" | "alt">) {
  const logo: tImage = useTranslations("components.images").raw("logo");

  return (
    <FullHDImage
      src={logo.url}
      alt={logo.alternate}
      className={cn("dark:invert", className)}
      {...props}
    />
  );
}

export { HDImage, FullHDImage };

export { Placeholder, Logo };
