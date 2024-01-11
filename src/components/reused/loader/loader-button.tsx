"use client";

import { FC } from "react";
import { ColorRing } from "react-loader-spinner";

type Props = {
  height?: string;
  width?: string;
  color?: string;
};
const LoaderOrig: FC<Props> = ({
  height = "32",
  width = "32",
  color = "#0f5863",
}) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={[color, color, color, color, color]}
    />
  );
};
export default LoaderOrig;
