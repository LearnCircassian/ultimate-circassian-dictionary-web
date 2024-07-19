import React, { useState } from "react";
import { FaFilter, FaSearch, FaTimesCircle } from "react-icons/fa";
import { cn } from "~/utils/classNames";
import useModal from "~/hooks/useModal";
import SearchFilterModal from "~/components/searchFilterModal";
import HeaderSearchResultsDropdown from "~/components/HeaderSearchResultsDropdown";
import { useParams, useRouter } from "next/navigation";
import { regularWordToSafeWord } from "~/utils/wordFormatting";
import useWindowSize from "~/hooks/useWindowDimensions";

export default function HeaderSearchContainer() {
  const { width } = useWindowSize();
  const [inputValue, setInputValue] = React.useState<string>("");
  const router = useRouter();
  const params = useParams<{ word: string }>();

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  function clickWordHandler(word: string) {
    const safeWord = regularWordToSafeWord(word);
    setInputValue("");
    setDropdownVisible(false);

    // Check if safeWord is contained in the current URL
    if (params && "word" in params && params.word === safeWord) {
      console.log("Word already in URL");
      return;
    }

    router.push(`/word/${safeWord}`);
  }
  const { show, hide } = useModal(); // Use the useModal hook here

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

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
    <div
      className={cn(
        "mx-auto flex items-center justify-center z-20",
        "xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-5/6 w-full",
      )}
    >
      {/* Search input */}
      <div className="relative flex w-full flex-col">
        <div
          className={cn(
            "flex items-center justify-center w-full",
            "sm:px-4 xs:px-2 px-1 py-3 text-black font-medium rounded-lg shadow",
            "3xl:text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-lg",
          )}
          style={{
            backgroundColor: "#f2f1f4",
            border: "2px solid #155e75",
          }} // Added border and adjusted background color
        >
          <FaSearch className="opacity-80" size={width < 300 ? 16 : 24} color="#155e75" />{" "}
          {/* Increased icon size */}
          <input
            className="flex-grow bg-transparent px-1 font-medium text-black outline-none sm:px-2"
            value={inputValue}
            onChange={inputChangeHandler}
            onFocus={() => setDropdownVisible(true)} // Set dropdownVisible state on focus
            placeholder="Let's find your word"
          />
          <button
            className={cn("flex items-center hover:opacity-80", { hidden: !inputValue })}
            onClick={() => setInputValue("")}
          >
            <FaTimesCircle className="opacity-80" size={24} color="#757575" />{" "}
            {/* Increased icon size */}
          </button>
        </div>
        {dropdownVisible && (
          <HeaderSearchResultsDropdown
            searchInputValue={inputValue}
            onWordSelection={clickWordHandler}
            setDropdownVisible={setDropdownVisible}
          />
        )}
      </div>

      {/* Filter button */}
      <button
        className={cn(
          "items-center gap-2 px-4 py-2 font-bold text-[#3182ce] hover:text-[#3182ce]/50",
          "text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl",
          "hidden md:flex",
        )}
        onClick={openFilterModal}
      >
        <FaFilter className="text-xl" /> Filter
      </button>
    </div>
  );
}
