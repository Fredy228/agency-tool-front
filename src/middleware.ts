export { default } from "next-auth/middleware";

export const config = { matcher: ["/auth/first-setup", "/welcome/:path*"] };
