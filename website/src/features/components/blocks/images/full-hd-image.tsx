// eslint-disable-next-line no-restricted-imports
import Image from "next/image";

import { ImagePropsType } from "./types/image-props.type";

export function FullHDImage(props: ImagePropsType) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1920" height="1080" />;
}
