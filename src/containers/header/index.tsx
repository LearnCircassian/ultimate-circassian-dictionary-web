import React, { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import HeaderSearchContainer from "~/containers/header/headerSearchContainer";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/classNames";
import Image from "next/image";
import SearchFilterModal from "~/components/searchFilterModal";
import useModal from "~/hooks/useModal"; // Import useModal hook

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { show, hide } = useModal(); // Use the useModal hook here

  const navigateToHome = () => {
    router.push("/");
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openFilterModal = () => {
    // Example of showing a modal with a component and specific configurations
    show(
      <SearchFilterModal hide={hide} />, // Replace ComponentToRender with your actual component
      {
        padding: 16,
        width: "407px",
        showClose: false,
        unstyled: true,
      },
    );
  };

  return (
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
            {isMobileMenuOpen ? <FaTimes size={36} /> : <FaBars size={36} />}
          </button>
        </div>
      </div>
      <div className="flex-grow gap-2 md:flex md:flex-row md:items-center md:gap-4">
        <HeaderSearchContainer />
        <button
          className="flex items-center gap-2 px-4 py-2 text-lg font-bold text-[#3182ce] hover:text-[#3182ce]/50"
          onClick={openFilterModal}
        >
          Filter
        </button>
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
          <button
            className="flex w-full items-center justify-center gap-2 py-4 text-lg font-bold text-lightGreen hover:text-lightGreen/70 "
            onClick={toggleMobileMenu}
          >
            <FaTimes />
            Close
          </button>
        </div>
      )}
    </div>
  );
}
