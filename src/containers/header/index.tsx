import React, { useState } from "react";
import { FaHome, FaTimes } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/classNames";
import Image from "next/image";
import useWindowSize from "~/hooks/useWindowDimensions";

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <div className="size-0 sm:size-[40px] md:size-[50px] lg:size-[60px] xl:size-[65px]">
      <Image
        src="/fav/icon-1042x1042.png"
        className={cn("cursor-pointer text-xl font-bold")}
        onClick={onClick}
        width={0}
        height={0}
        sizes="60vw"
        style={{ width: "100%", height: "auto" }} // optional
        alt="logo"
      />
    </div>
  );
}

function NavItem({
  item,
  onClick,
}: {
  item: { title: string; link: string; icon: React.ReactNode };
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-1 rounded-lg px-2 py-2 font-bold text-[#303f2e] hover:text-[#637f5e]/50",
        "3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl text-xl",
      )}
      onClick={onClick}
    >
      {item.icon}
      {item.title}
    </button>
  );
}

function MobileNavItem({
  item,
  onClick,
}: {
  item: { title: string; link: string | undefined; icon: React.ReactNode };
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "text-lightGreen hover:text-lightGreen/70 flex w-full items-center justify-center gap-2 py-4 text-lg font-bold",
      )}
      onClick={onClick}
    >
      {item.icon}
      {item.title}
    </button>
  );
}
export default function Header() {
  const { width } = useWindowSize();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (link: string) => () => {
    router.push(link);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { title: "Home", link: "/", icon: <FaHome /> },
    { title: "Dictionary", link: "/dictionary", icon: <MdMenuBook /> },
  ];

  return (
    <div>
      <div
        className="
        relative flex flex-row gap-4 bg-[#afdda7] 
        p-2 sm:gap-2 
        sm:px-0"
      >
        <div className="flex flex-row items-center gap-1 sm:gap-4">
          <Logo onClick={navigateTo("/")} />
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <NavItem key={item.title} item={item} onClick={navigateTo(item.link)} />
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <FaTimes size={width < 400 ? 26 : 36} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-16 z-60 w-full bg-white shadow-lg md:hidden">
            {navItems.map((item) => (
              <MobileNavItem key={item.title} item={item} onClick={navigateTo(item.link)} />
            ))}

            <MobileNavItem
              item={{ title: "Close", link: "", icon: <FaTimes /> }}
              onClick={toggleMobileMenu}
            />
          </div>
        )}
      </div>
    </div>
  );
}
