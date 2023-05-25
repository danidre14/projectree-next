"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getProviders, useSession } from "next-auth/react";

import Link from "next/link";

const SignIn = ({ searchParams }) => {
  const router = useRouter();
  const { status } = useSession();

  const { error: errorType } = searchParams;

  const [providers, setProviders] = useState(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");

    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();

    if (errorType && errorType !== "CredentialsSignin") {
      alert(errorType);
      router.replace("/signin");
    }
  }, [status]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      if (!name) {
        alert("Email field required.");
        return;
      }
      if (!password) {
        alert("Password field required.");
        return;
      }

      const response = await signIn("credentials", {
        name,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (response.error) {
        alert(response.error);
      } else if (response.ok) {
        router.push(response.url);
      }
    } catch (err) {
      alert("Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "unauthenticated")
    return (
      <>
        {/* {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="black_btn"
          >
            Sign In as {provider.name}
          </button>
        ))} */}
        <div className="flex h-full flex-grow flex-col">
          <div className="border-b border-zinc-200 bg-zinc-50">
            <div className="container mx-auto py-5 px-4 sm:px-12">
              <h1 className="font-semibold text-4xl">Sign In</h1>
            </div>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="container mx-auto flex-grow px-4 sm:px-12">
              <div className="flex h-full flex-col gap-12 py-12">
                <div className="grid gap-12 sm:grid-cols-2 xl:w-2/3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="name"
                      className="text-xl italic text-neutral-600"
                    >
                      Username or Email
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      autoComplete="username"
                      id="name"
                      className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                      name="name"
                      value={name}
                      tabIndex={1}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="account_password"
                      className="text-xl italic text-neutral-600"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      autoComplete="current-password"
                      id="account_password"
                      className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                      name="password"
                      value={password}
                      tabIndex={1}
                    />
                  </div>
                </div>
                <p className="italic">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-red-400 underline hover:text-red-800"
                    tabIndex={2}
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 container mx-auto bg-zinc-50 px-4 sm:px-12">
              <div className="flex py-5">
                <div className="ml-auto whitespace-nowrap">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-block whitespace-nowrap rounded bg-red-400 py-2 px-5 font-bold text-zinc-50 hover:bg-red-800"
                    tabIndex={1}
                  >
                    {submitting ? `Sign In...` : "Sign In"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
};

export default SignIn;
