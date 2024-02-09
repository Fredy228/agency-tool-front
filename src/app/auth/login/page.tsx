import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/screens/auth/Auth"), { ssr: false });

export default function LoginPage() {
  return <Auth />;
}
