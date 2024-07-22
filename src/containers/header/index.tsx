import React, { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import HeaderSearchContainer from "~/containers/header/headerSearchContainer";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/classNames";
import Image from "next/image";
import useWindowSize from "~/hooks/useWindowDimensions";

export default function Header() {
  const { width } = useWindowSize();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateToHome = () => {
    router.push("/");
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* <div className="flex w-full flex-row items-center justify-center bg-red-400 p-4 shadow">
        <p className="text-lg text-white lg:text-4xl">
          The website is in its early stages and is still being developed, some features might not
          work as intended.
        </p>
      </div> */}
      <div className="relative z-50 mx-auto flex w-full flex-row items-center justify-between gap-1 px-1 pt-12 sm:w-11/12 sm:gap-2 sm:px-0 md:gap-4">
        <div className="flex flex-row items-center gap-1 sm:gap-4">
          <div className="size-0 sm:size-[75px] md:size-[100px] lg:size-[120px] xl:size-[125px]">
            <Image
              src="/fav/icon-1042x1042.png"
              className={cn("cursor-pointer text-xl font-bold")}
              onClick={navigateToHome}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
              alt="logo"
            />
          </div>
          <div className="hidden md:flex">
            <button
              className={cn(
                "flex items-center gap-1 rounded-lg px-2 py-2 font-bold text-[#a1d199] hover:text-[#a1d199]/50",
                "3xl:text-5xl 2xl:text-4xl xl:text-2xl lg:text-xl text-xl",
              )}
              onClick={navigateToHome}
            >
              <FaHome />
              Home
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <FaTimes size={width < 400 ? 26 : 36} />
            </button>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-2">
          <HeaderSearchContainer />
        </div>
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-16 z-60 w-full bg-white shadow-lg md:hidden">
            <button
              className="text-lightGreen hover:text-lightGreen/70 flex w-full items-center justify-center gap-2 py-4 text-lg font-bold "
              onClick={navigateToHome}
            >
              <FaHome />
              Home
            </button>
            <button
              className="text-lightGreen hover:text-lightGreen/70 flex w-full items-center justify-center gap-2 py-4 text-lg font-bold "
              onClick={toggleMobileMenu}
            >
              <FaTimes />
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
