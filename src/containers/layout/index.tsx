import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import Header from "~/containers/header";
import { SocialIcon } from "react-social-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

function GlobalFooter() {
  const router = useRouter();
  const internalLinks = [
    {
      title: "Website",
      links: [
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact-us" },
      ],
    },
    {
      title: "Legal",
      links: [{ title: "Policy", href: "/policy" }],
    },
  ];

  const socialMedias = [
    { title: "YouTube", href: "https://www.youtube.com/channel/UCHB90-79TUQRfCY_DG7efkQ" },
    { title: "Instagram", href: "https://www.instagram.com/circassian.grammar/" },
  ];
  return (
    <footer className="bg-gray-800 text-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-2 pt-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <Image
            className="row-span-1 h-10"
            src="/fav/icon-1042x1042.png"
            width={50}
            height={50}
            alt="Company logo"
          />

          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-300">LearnCircassian</h2>

                <p className="mt-4 text-gray-300">Preserving the Circassian Language.</p>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end"></div>
            {/*Internal Links */}
            {internalLinks.map((link) => (
              <div key={link.title}>
                <p className="mt-2 inline-block text-sm font-semibold uppercase tracking-wider text-gray-400">
                  {link.title}
                </p>
                <ul className="ml-2 mt-2 space-y-0">
                  {link.links.map((link) => (
                    <li key={link.title}>
                      <span
                        onClick={() => router.push(link.href)}
                        className="m-0 cursor-pointer p-0 text-base text-gray-300 hover:text-white"
                      >
                        {link.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/*Social Media */}
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {socialMedias.map((media) => (
                <li key={media.title}>
                  <SocialIcon
                    url={media.href}
                    style={{ height: 25, width: 25 }}
                    className="text-gray-300"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-100 pt-2">
          <div className="sm:flex sm:justify-between">
            <p className="text-gray-300text-gray-300 text-xs">
              &copy; 2022. LearnCircassian. All rights reserved.
            </p>

            <ul className="mt-2 flex flex-wrap justify-start gap-4 text-xs text-gray-300 sm:mt-0 lg:justify-end">
              <li>
                <span
                  onClick={() => router.push("/policy")}
                  className="cursor-pointer transition hover:opacity-75"
                >
                  {" "}
                  Privacy Policy{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div data-test-id="main-header z-50">
        <div className="z-50 w-full">
          <Header />
        </div>
      </div>
      <div className="bg-image">
        <div className="relative flex w-full flex-row justify-center">{children}</div>
      </div>
      <GlobalFooter />
    </>
  );
}
