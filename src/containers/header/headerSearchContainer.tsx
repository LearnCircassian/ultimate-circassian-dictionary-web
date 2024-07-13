import React, { useState } from "react";
import HeaderSearchInput from "~/components/headerSearchInput";
import { useRouter } from "next/navigation";
import HeaderSearchResultsDropdown from "~/components/HeaderSearchResultsDropdown";

export default function HeaderSearchContainer() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const router = useRouter();

  function wordSelectionHandler(word: string) {
    setSearchInputValue("");
    router.push(`/word/${word}`);
  }

  return (
    <div className="relative z-50 flex w-full flex-col justify-between gap-4">
      <div className="flex w-full flex-row items-center justify-center">
        <HeaderSearchInput
          value={searchInputValue}
          onChange={setSearchInputValue}
          onFocus={() => setDropdownVisible(true)} // Set dropdownVisible state on focus
          placeholder="Let's find your word"
        />
      </div>
      {dropdownVisible && (
        <HeaderSearchResultsDropdown
          searchInputValue={searchInputValue}
          onWordSelection={wordSelectionHandler}
          setDropdownVisible={setDropdownVisible}
        />
      )}
    </div>
  );
}
