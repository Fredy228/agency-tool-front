import dynamic from "next/dynamic";

const FirstSetup = dynamic(() => import("@/screens/first-setup/FirstSetup"), {
  ssr: false,
});

export default function FirstSetupPage() {
  return <FirstSetup />;
}
