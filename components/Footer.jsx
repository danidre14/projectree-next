import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="border-t border-zinc-300 bg-zinc-50 p-5 px-4 text-stone-700 shadow sm:px-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-center">
          <div className="sm:text-lg">
            <span>ProjecTree © 2023</span>
            {" | "}
            <Link
              href="/legal/privacy"
              className="text-red-400 underline hover:text-red-800"
            >
              Privacy Policy
            </Link>
            {" | "}
            <Link
              href="/legal/tos"
              className="text-red-400 underline hover:text-red-800"
            >
              Terms of Service
            </Link>
          </div>
          <div>
            Created for the
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://townhall.hashnode.com/planetscale-hackathon"
              className="rounded p-1 font-semibold underline hover:bg-zinc-200"
            >
              Planetscale x Hashnode Hackathon
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-300 bg-zinc-50 p-3 px-4 sm:px-12 text-stone-700 shadow">
        <div className="container mx-auto flex items-center justify-center gap-2 text-xl md:gap-4">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://hashnode.com/?source=planetscale_hackathon_announcement"
            className="flex items-center rounded p-2 hover:bg-zinc-200"
          >
            <Image
              src="/assets/icons/hashnode-icon.png"
              alt="Hashnode Icon"
              width={30}
              height={30}
              className="object-contain sm:mr-2 h-7 w-7"
              title="Hashnode"
            />
            <span className="hidden sm:inline">Hashnode</span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://planetscale.com/?utm_source=hashnode&utm_medium=hackathon&utm_campaign=announcement_article"
            className="flex items-center rounded p-2 hover:bg-zinc-200"
          >
            <Image
              src="/assets/icons/planetscale-icon.png"
              alt="PlanetScale Icon"
              width={30}
              height={30}
              className="object-contain sm:mr-2 h-7 w-7"
              title="PlanetScale"
            />
            <span className="hidden sm:inline">PlanetScale</span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://blog.danidre.com/introducing-projectree"
            className="flex items-center rounded p-2 hover:bg-zinc-200"
          >
            <Image
              src="/assets/icons/blog-icon.png"
              alt="About Project Icon"
              width={30}
              height={30}
              className="object-contain sm:mr-2 h-7 w-7"
              title="About Project"
            />
            <span className="hidden sm:inline">About</span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/danidre14/projectree_frontend"
            className="flex items-center rounded p-2 hover:bg-zinc-200"
          >
            <Image
              src="/assets/icons/github-icon.png"
              alt="GitHub Source Icon"
              width={30}
              height={30}
              className="object-contain sm:mr-2 h-7 w-7"
              title="GitHub Source"
            />
            <span className="hidden sm:inline">Github</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
