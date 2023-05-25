import "@styles/globals.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

import { getURL } from "@utils/helperUtils";

export const metadata = {
  metadataBase: getURL(),
  title: "Projectree",
  description:
    "Projectree helps you create your project showcase in as little as 5 minutes!",
  openGraph: {
    title: "Projectree",
    description:
      "Projectree helps you create your project showcase in as little as 5 minutes!",
    url: getURL(),
    siteName: "Projectree",
    images: [
      {
        url: getURL("/assets/images/projectree-cover-small.png"),
        width: 1200,
        height: 630,
        alt: "Projectree Brand Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body>
        <Provider>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex h-full flex-grow flex-col bg-zinc-50">
              {children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
