"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  const handleSignOut = async (e) => {
    const data = await signOut({ redirect: false, callbackUrl: "/signin" });
    router.push(data.url);
  };

  return (
    <>
      {session?.user ? (
        <nav className="sticky ${hiddenText} top-0 z-30 border-b border-zinc-300 bg-zinc-50 py-4 px-4 sm:px-12 text-red-600 shadow-sm">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="w-full">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/images/projectree-logo-primary.jpg"
                  alt="Projectree Logo"
                  width={30}
                  height={30}
                  className="object-contain h-10 w-10"
                />
                <p className="hidden text-3xl font-semibold sm:inline">
                  rojectree
                </p>
              </Link>
            </div>
            <div className="hidden w-full flex-grow truncate text-center font-medium text-stone-700 sm:inline">
              {session?.user.email}
            </div>
            <div className="flex w-full items-center justify-end gap-2 whitespace-nowrap">
              <Link
                href="/dashboard"
                className="inline-block whitespace-nowrap rounded py-2 px-5 font-semibold text-red-400 border border-red-400 hover:bg-red-400 hover:text-zinc-50"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-block whitespace-nowrap rounded bg-red-400 py-2 px-5 font-bold text-zinc-50 hover:bg-red-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="sticky ${hiddenText} top-0 z-30 border-b border-zinc-300 bg-zinc-50 py-4 px-4 sm:px-12 text-red-600 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/images/projectree-logo-primary.jpg"
                  alt="Projectree Logo"
                  width={30}
                  height={30}
                  className="object-contain h-10 w-10"
                />
                <p className="hidden text-3xl font-semibold sm:inline">
                  rojectree
                </p>
              </Link>
            </div>
            <div className="flex flex-grow-0 flex-wrap items-center justify-end gap-2">
              <Link
                href="/signin"
                className="inline-block whitespace-nowrap rounded bg-red-400 py-2 px-5 font-bold text-zinc-50 hover:bg-red-800"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-block whitespace-nowrap rounded bg-red-400 py-2 px-5 font-bold text-zinc-50 hover:bg-red-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptiopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div>
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Prompt
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
