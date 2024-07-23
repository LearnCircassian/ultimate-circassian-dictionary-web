import React, { useState } from "react";
import { FaFilter, FaSearch, FaTimesCircle } from "react-icons/fa";
import { cn } from "~/utils/classNames";
import SearchFilterDialog from "~/components/searchFilterModal";
import HeaderSearchResultsDropdown from "~/containers/HeaderSearchResultsDropdown";
import { useParams, useRouter } from "next/navigation";
import { regularWordToSafeWord } from "~/utils/wordFormatting";
import useWindowSize from "~/hooks/useWindowDimensions";

export default function HeaderSearchContainer() {
  const { width } = useWindowSize();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [filterDialogVisible, setFilterDialogVisible] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams<{ word: string }>();

  function clickWordHandler(word: string) {
    const safeWord = regularWordToSafeWord(word);
    setInputValue("");
    setDropdownVisible(false);

    if (params && "word" in params && params.word === safeWord) {
      console.log("Word already in URL");
      return;
    }

    router.push(`/word/${safeWord}`);
  }

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  const openFilterDialog = () => {
    setFilterDialogVisible(true);
  };

  const closeFilterDialog = () => {
    setFilterDialogVisible(false);
  };

  return (
    <div
      className={cn(
        "mx-auto flex flex-row items-center justify-center z-20",
        "xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-5/6 w-full",
      )}
    >
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
          }}
        >
          <FaSearch className="opacity-80" size={width < 400 ? 16 : 24} color="#155e75" />
          <input
            className="flex-grow bg-transparent px-1 font-medium text-black outline-none sm:px-2"
            value={inputValue}
            onChange={inputChangeHandler}
            onFocus={() => setDropdownVisible(true)}
            placeholder="Let's find your word"
            style={{
              maxWidth: "85%",
              fontSize: width < 400 ? "0.75rem" : "1rem",
            }}
          />
          <button
            className={cn("flex items-center hover:opacity-80", { hidden: !inputValue })}
            onClick={() => setInputValue("")}
          >
            <FaTimesCircle className="opacity-80" size={24} color="#757575" />
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

      <div className="relative">
        <button
          className={cn(
            "w-full items-center gap-1 px-4 py-2 font-bold text-[#3182ce] hover:text-[#3182ce]/50",
            "hidden md:flex",
          )}
          onClick={openFilterDialog}
        >
          <FaFilter className="text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl" />
          <span className="w-full text-nowrap text-base xl:text-lg 2xl:text-xl 3xl:text-2xl">
            Search Filter
          </span>
        </button>
        {filterDialogVisible && (
          <div className="absolute right-0 z-50 mt-2 w-[407px]">
            <SearchFilterDialog hide={closeFilterDialog} />
          </div>
        )}
      </div>
    </div>
  );
}
