
import Link from "next/link";
import Image from "next/image";
// import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="flex h-full flex-grow flex-col">
      <div className="container mx-auto flex flex-grow flex-col px-4 sm:px-12">
        <div className="flex-w flex flex-col-reverse items-center justify-center gap-0 space-y-6 pb-8 sm:justify-between sm:gap-8 md:flex-row md:space-y-0 md:pb-0">
          <div className="flex max-w-lg flex-col items-center space-y-8 text-center md:max-w-3xl md:items-start lg:py-16 lg:text-left">
            <p className="mt-4 text-[40px] font-extrabold tracking-tight text-gray-600 sm:mt-5 sm:text-6xl lg:mt-2 xl:text-6xl">
              <span className="block leading-tight">Create your</span>
              <span className="bg-gradient-to-b from-red-800 to-red-400 bg-clip-text py-2 leading-tight text-transparent">
                Project Showcase
              </span>
              <span className="block leading-tight">in 5 minutes!</span>
            </p>
            <div className="px-4 sm:px-12 md:mt-3 md:px-2">
              <p className="text-base font-normal text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Create and showcase your projects lists without the hassle of
                building it yourself. Just add your project details, choose a
                theme, and generate!
              </p>
              <Link href="/create" className="inline-block mt-8 mb-8 whitespace-nowrap rounded bg-red-400 py-2 px-5 font-bold text-zinc-50 hover:bg-red-800">
                Create
              </Link>
            </div>
          </div>
          <div className="min-w-min sm:min-w-max pt-12 pb-12 md:pt-0 md:pb-0">
            <div className="relative flex items-center justify-center">
              <Image
                src="/assets/images/projectree-hero-image.png"
                alt="Projectree Hero Image"
                width={394}
                height={407}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="w-full flex-center flex-col">
    //     <h1 className="head_text text-center">
    //         Discover and Share
    //         <br className="max-md:hidden" />
    //         <span className="orange_gradient text-center
    //         ">AI-Powered Prompts</span>
    //     </h1>
    //     <p className="desc text-center">
    //         Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
    //     </p>

    //     <Feed />
    // </section>
  );
};

export default Home;
