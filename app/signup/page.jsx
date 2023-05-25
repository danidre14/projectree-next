"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const { status } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const createUser = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      if (!firstName) {
        alert("First name field required");
        return;
      }
      if (!lastName) {
        alert("Last name field required");
        return;
      }

      if (!username) {
        alert("Username field required");
        return;
      }
      if (username.length < 4 || username.length > 15) {
        alert("Username must be 4-15 characters long");
        return;
      } else {
        if (username.charAt(0).match(/^[a-z]+$/gi) === null) {
          alert("Username must start with a letter\n");
          return;
        } else if (username.match(/^[a-z][a-z\d]+$/gi) === null) {
          alert("Symbols/Spaces not allowed in username");
          return;
        }
      }

      if (!email1 || !email2) {
        alert("Email fields required");
        return;
      }

      if (!password1 || !password2) {
        alert("Password fields required");
        return;
      }
      if (password1.length < 8) {
        alert("Password must be 8 or more characters\n");
        return;
      }
      if (password1.search(/\d/) === -1) {
        alert("Password must contain at least one number\n");
        return;
      }
      if (password1.search(/[A-Z]/) === -1) {
        alert("Password must contain at least one uppercase letter\n");
        return;
      }

      if (email1 !== email2) {
        alert("Emails do not match");
        return;
      }

      if (password1 !== password2) {
        alert("Passwords do not match");
        return;
      }

      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email1,
          email2,
          password1,
          password2,
        }),
      });

      if (response.ok) {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "unauthenticated")
  return (
    <section className="flex h-full flex-grow flex-col">
      <div className="border-b border-zinc-200 bg-zinc-50">
        <div className="container mx-auto py-5 px-4 sm:px-12">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
        </div>
      </div>
      <form onSubmit={createUser}>
        <div className="container mx-auto flex-grow px-4 sm:px-12">
          <div className="flex h-full flex-col gap-12 py-12">
            <div className="grid gap-12 sm:grid-cols-2 xl:w-2/3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="firstName"
                  className="text-xl italic text-neutral-600"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="firstName"
                  value={firstName}
                  tabIndex={1}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastName"
                  className="text-xl italic text-neutral-600"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastName"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="lastName"
                  value={lastName}
                  tabIndex={1}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className="text-xl italic text-neutral-600"
                >
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  autoComplete="username"
                  id="username"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="username"
                  value={username}
                  tabIndex={1}
                />
              </div>
              <div className="hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email1"
                  className="text-xl italic text-neutral-600"
                >
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail1(e.target.value)}
                  type="email"
                  id="email1"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="email1"
                  value={email1}
                  tabIndex={1}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email2"
                  className="text-xl italic text-neutral-600"
                >
                  Confirm Email
                </label>
                <input
                  onChange={(e) => setEmail2(e.target.value)}
                  type="email"
                  id="email2"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="email2"
                  value={email2}
                  tabIndex={1}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password1"
                  className="text-xl italic text-neutral-600"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword1(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  id="password1"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="password1"
                  value={password1}
                  tabIndex={1}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password2"
                  className="text-xl italic text-neutral-600"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setPassword2(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  id="password2"
                  className="rounded-lg border border-zinc-200 bg-white py-1 px-3 text-xl outline-none focus:bg-gray-50"
                  name="password2"
                  value={password2}
                  tabIndex={1}
                />
              </div>
            </div>
            <p className="italic">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-red-400 underline hover:text-red-800"
                tabIndex={2}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="container sticky bottom-0 mx-auto bg-zinc-50 px-4 sm:px-12">
          <div className="container mx-auto flex py-5">
            <div className="ml-auto whitespace-nowrap">
              <button
                type="submit"
                disabled={submitting}
                className="inline-block whitespace-nowrap rounded bg-red-400 py-2 px-5 font-bold text-zinc-50 hover:bg-red-800"
                tabIndex={1}
              >
                {submitting ? `Sign Up...` : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
