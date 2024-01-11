import React from "react";

import WelcomeLayout from "@/components/layout/welcom-layout/WelcomeLayout";

export default function LayoutWelcome({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WelcomeLayout>{children}</WelcomeLayout>;
}
