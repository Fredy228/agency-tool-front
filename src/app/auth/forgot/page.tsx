import dynamic from "next/dynamic";

const AuthForgot = dynamic(() => import("@/screens/forgot-pass/AuthForgot"), {
  ssr: false,
});

export default function AuthForgotPage() {
  return <AuthForgot />;
}
