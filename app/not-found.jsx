"use client";

import Link from "next/link";

import { useRouter, usePathname } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const pathname = usePathname();

  const goBack = (e) => {
    router.back();
  };
  return (
    <div class="flex h-full flex-grow flex-col">
      <div class="border-b border-zinc-200 bg-zinc-50">
        <div class="container mx-auto py-5 px-4 sm:px-12">
          <h1 class="text-4xl font-semibold">404 - Page Not Found</h1>
        </div>
      </div>
      <div class="container mx-auto flex-grow px-4 sm:px-12">
        <div class="flex h-full flex-col gap-12 py-12">
          <div>
            <p class="text-lg sm:text-xl">
              The page requested at "{pathname}" could not be found.
            </p>
            <p class="mt-4 text-sm italic sm:text-base">
              Broken link?{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/danidre14/projectree-frontend/issues"
                className="font-semibold text-red-400 underline hover:text-red-800"
              >
                Report it here
              </Link>
            </p>
          </div>
          <p class="mt-8 text-base sm:text-lg">
            <button
              type="button"
              onClick={goBack}
              className="font-semibold italic text-red-400 underline hover:text-red-800"
            >
              Back
            </button>
            {" | "}
            <Link
              href="/"
              className="font-semibold italic text-red-400 underline hover:text-red-800"
            >
              Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
