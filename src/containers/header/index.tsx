import React, { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import HeaderSearchContainer from "~/containers/header/headerSearchContainer";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/classNames";

export default function Header() {
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
    <div className="relative z-50 mx-auto flex w-11/12 flex-row items-center justify-between gap-4 pt-8">
      <div className="flex flex-row items-center gap-4">
        <h1
          className={cn("cursor-pointer text-xl font-bold md:visible hidden")}
          onClick={navigateToHome}
        >
          Logo
        </h1>
        <div className="hidden md:flex">
          <button
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-2 font-bold text-lightGreen hover:text-lightGreen/70",
              "2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm",
            )}
            onClick={navigateToHome}
          >
            <FaHome />
            Home
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      <div className="flex-grow md:flex md:flex-row md:items-center md:gap-4">
        <HeaderSearchContainer />
      </div>
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-16 z-60 w-full bg-white shadow-lg md:hidden">
          <button
            className="flex w-full items-center justify-center gap-2 py-4 text-lg font-bold text-lightGreen hover:text-lightGreen/70 "
            onClick={navigateToHome}
          >
            <FaHome />
            Home
          </button>
        </div>
      )}
    </div>
  );
}
