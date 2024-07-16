import React, { useState } from "react";
import HeaderSearchInput from "~/components/headerSearchInput";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import HeaderSearchResultsDropdown from "~/components/HeaderSearchResultsDropdown";
import { regularWordToSafeWord } from "~/utils/safeWords";

export default function HeaderSearchContainer() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams<{ word: string }>();

  function clickWordHandler(word: string) {
    const safeWord = regularWordToSafeWord(word);
    setSearchInputValue("");

    // Check if safeWord is contained in the current URL
    if ("word" in params && params.word === safeWord) {
      console.log("Word already in URL");
      return;
    }

    router.push(`/word/${safeWord}`);
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
          onWordSelection={clickWordHandler}
          setDropdownVisible={setDropdownVisible}
        />
      )}
    </div>
  );
}
