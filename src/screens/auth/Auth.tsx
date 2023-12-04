"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import type { NextPage } from "next";
import type { FormEventHandler } from "react";

import styles from "./auth.module.scss";

type Props = {};
const Auth: NextPage<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const isRegister = pathname === "/auth/register";
  const session = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const isMatchesPass =
    isRegister && password === rePassword && password !== "";

  console.log("session", session);

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const answer = await signIn("credentials", {
      email,
      password,
      name,
      type: pathname.split("/")[2],
      redirect: false,
    });
    console.log("answer", answer);

    if (answer?.error) {
      if (answer.status === 401) {
        console.error("Error 401");
      } else {
        console.error("Unknown error");
      }
    }

    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const answer = await signIn("google", {
      callbackUrl,
    });

    if (answer?.error) {
      if (answer.status === 401) {
        console.error("Error 401");
      } else {
        console.error("Unknown error");
      }
    }

    setIsLoading(false);
  };

  return (
    <main>
      <div>
        <form onSubmit={submitForm}>
          <label>
            {isRegister ? "Email" : "Login"}
            <input
              type="text"
              required={true}
              placeholder={"Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value.trim())}
            />
          </label>
          {isRegister && (
            <label>
              Name
              <input
                type="text"
                placeholder={"Enter your name"}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </label>
          )}

          <label>
            Password
            <input
              required={true}
              type="password"
              placeholder={"Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value.trim())}
            />
          </label>
          {isRegister && (
            <label>
              <input
                required={true}
                type="password"
                placeholder={"Reenter your password"}
                value={rePassword}
                onChange={(e) => setRePassword(e.currentTarget.value.trim())}
              />
            </label>
          )}
          <button type={"submit"} disabled={isLoading && !isMatchesPass}>
            {isRegister ? "Sign up" : "Sign in"}
          </button>
          <button type={"button"} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </form>
        <button
          type={"button"}
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
            })
          }
        >
          Sing out
        </button>
      </div>
    </main>
  );
};
export default Auth;
