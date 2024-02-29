import { type FC } from "react";
import Image from "next/image";

type Props = {
  customClass: string;
  buffer: Buffer | null | undefined;
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
  format?: string;
};
const BufferImg: FC<Props> = ({
  customClass,
  buffer,
  width = 40,
  height = 40,
  alt = "Image",
  priority = false,
  format = "webp",
}) => {
  let imageUrl = null;
  if (buffer) {
    const base64Image = Buffer.from(buffer).toString("base64");
    imageUrl = `data:image/${format};base64,${base64Image}`;
  }

  if (!imageUrl) return;

  return (
    <Image
      className={customClass}
      src={imageUrl}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
    />
  );
};

export default BufferImg;
