import React, { useState } from "react";
import { FaHome, FaTimes, FaHamburger } from "react-icons/fa";
import { MdMenuBook, MdContactSupport } from "react-icons/md";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/classNames";
import Image from "next/image";
import useWindowSize from "~/hooks/useWindowDimensions";
import SearchContainer from "~/containers/header/searchContainer";
import { usePathname } from "next/navigation";

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
        "text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl",
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
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (link: string) => {
    router.push(link);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const navItems = [
    { title: "Home", link: "/", icon: <FaHome /> },
    { title: "Dictionary", link: "/dictionary", icon: <MdMenuBook /> },
    { title: "The Language Path", link: "/the-language-path", icon: <MdMenuBook /> },
    { title: "Grammar", link: "/grammar", icon: <MdMenuBook /> },
    { title: "Contact Us", link: "/contact-us", icon: <MdContactSupport /> },
  ];

  if (width < 640) {
    return (
      <div className={cn("z-50 w-full", { fixed: pathname?.includes("dictionary") })}>
        <div className="relative z-50 flex flex-row gap-4 bg-[#afdda7] p-2 shadow">
          <div className="mx-auto flex w-full flex-row items-center gap-1">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FaHamburger size={36} />
            </button>
            <SearchContainer showOnMobile={true} />
          </div>

          {isMobileMenuOpen && (
            <div className="absolute left-0 top-16 z-60 w-full bg-white shadow-lg">
              {navItems.map((item) => (
                <MobileNavItem key={item.title} item={item} onClick={() => navigateTo(item.link)} />
              ))}

              <MobileNavItem
                item={{ title: "Close", link: "", icon: <FaTimes /> }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-row gap-4 bg-[#afdda7] p-2 shadow sm:gap-2 sm:px-0">
      <div className="mx-auto flex w-11/12 flex-row items-center gap-1 sm:gap-4">
        <Logo onClick={() => navigateTo("/")} />
        <div className="flex">
          {navItems.map((item) => (
            <NavItem key={item.title} item={item} onClick={() => navigateTo(item.link)} />
          ))}
        </div>
      </div>
    </div>
  );
}
