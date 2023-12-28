import React from "react";

import UserLayout from "@/components/layout/user-layout/UserLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayout>{children}</UserLayout>;
}
