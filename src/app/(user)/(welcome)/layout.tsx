import React from "react";

import WelcomeLayout from "@/components/layout/welcom-layout/WelcomeLayout";
import { ProtectWrapper } from "@/components/provider/ProtectWrapper";

export default function LayoutWelcome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectWrapper>
      <WelcomeLayout>{children}</WelcomeLayout>;
    </ProtectWrapper>
  );
}
