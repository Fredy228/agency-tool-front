"use client";

import { FC } from "react";
import { ColorRing } from "react-loader-spinner";

type Props = {};
const LoaderPage: FC<Props> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
