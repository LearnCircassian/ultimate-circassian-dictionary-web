import React, { useRef, useState } from "react";
import { FaFilter, FaSearch, FaTimesCircle } from "react-icons/fa";
import { cn } from "~/utils/classNames";
import SearchFilterDialog from "~/components/searchFilterModal";
import HeaderSearchResultsDropdown from "~/components/HeaderSearchResultsDropdown";
import { useParams, useRouter } from "next/navigation";
import { regularWordToSafeWord } from "~/utils/wordFormatting";
import useWindowSize from "~/hooks/useWindowDimensions";
import KeyboardWrapper from "~/components/keyboardWrapper";

export default function SearchContainer({ showOnMobile }: { showOnMobile: boolean }) {
  const { width } = useWindowSize();
  const searchInputRef = useRef<HTMLInputElement>(null);
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

    router.push(`/dictionary/${safeWord}`);
  }

  function keyboardSearchBtnHandler() {
    if (inputValue.length === 0) {
      return;
    }
    searchInputRef.current?.focus();
  }

  if (!showOnMobile && width < 640) {
    return null;
  }

  if (showOnMobile && width < 640) {
    return (
      <div className="z-2 mx-auto flex w-11/12 flex-col">
        <div className={cn("flex flex-row items-center justify-center")}>
          {/* Search Input */}
          <SearchInput
            searchInputRef={searchInputRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setDropdownVisible={setDropdownVisible}
            clickWordHandler={clickWordHandler}
            dropdownVisible={dropdownVisible}
          />

          {/* Search Filter */}
          <SearchFilter
            filterDialogVisible={filterDialogVisible}
            openFilterDialog={() => setFilterDialogVisible(true)}
            closeFilterDialog={() => setFilterDialogVisible(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="z-2 mx-auto flex w-11/12 flex-col">
      <div className={cn("flex flex-row items-center justify-center")}>
        {/* Search Input */}
        <SearchInput
          searchInputRef={searchInputRef}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setDropdownVisible={setDropdownVisible}
          clickWordHandler={clickWordHandler}
          dropdownVisible={dropdownVisible}
        />

        {/* Search Filter */}
        <SearchFilter
          filterDialogVisible={filterDialogVisible}
          openFilterDialog={() => setFilterDialogVisible(true)}
          closeFilterDialog={() => setFilterDialogVisible(false)}
        />
      </div>
      {/* Search Keyboard */}
      <div className="mx-auto mt-4 flex w-11/12 flex-row items-center justify-center xl:w-1/2">
        <KeyboardWrapper
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearchClick={keyboardSearchBtnHandler}
        />
      </div>
    </div>
  );
}

function SearchInput({
  searchInputRef,
  inputValue,
  setInputValue,
  setDropdownVisible,
  dropdownVisible,
  clickWordHandler,
}: {
  inputValue: string;
  setInputValue: (v: string) => void;
  setDropdownVisible: (value: boolean) => void;
  dropdownVisible: boolean;
  clickWordHandler: (word: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const { width } = useWindowSize();
  return (
    <div className="relative flex w-full flex-col">
      <div
        className={cn(
          "flex w-full items-center justify-center bg-white",
          "border border-solid",
          "xs:px-2 rounded-md px-1 py-3 font-medium text-black shadow-sm sm:px-4",
          "text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl",
          inputValue.length > 0
            ? "border-2 border-[#b0e0b5]"
            : "border-[#cdcdcd] hover:border-[#b0e0b5]/60",
        )}
      >
        <FaSearch className="opacity-80" size={width < 400 ? 16 : 24} color="#155e75" />
        <input
          ref={searchInputRef}
          className="flex-grow bg-transparent px-1 font-medium text-black outline-none sm:px-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setDropdownVisible(true)}
          placeholder="Search, e.g. boy or к1алэ"
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
          dropdownVisible={dropdownVisible}
          setDropdownVisible={setDropdownVisible}
        />
      )}
    </div>
  );
}

function SearchFilter({
  filterDialogVisible,
  openFilterDialog,
  closeFilterDialog,
}: {
  filterDialogVisible: boolean;
  openFilterDialog: () => void;
  closeFilterDialog: () => void;
}) {
  return (
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
  );
}
