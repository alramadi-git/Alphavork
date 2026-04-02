import Image from "next/image";

import { ImageProps } from "../types/image.props";

export function FullHDImage(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1920" height="1080" />;
}
