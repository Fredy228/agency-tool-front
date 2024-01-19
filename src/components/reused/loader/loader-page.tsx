"use client";

import { FC } from "react";
import { ColorRing } from "react-loader-spinner";

type Props = {
  isFull?: boolean;
};
const LoaderPage: FC<Props> = ({ isFull = false }) => {
  return (
    <div
      style={{
        width: `100${isFull ? "vw" : "%"}`,
        height: `100${isFull ? "vh" : "%"}`,
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#0f5863", "#0f5863", "#0f5863", "#0f5863", "#0f5863"]}
      />
    </div>
  );
};
export default LoaderPage;
