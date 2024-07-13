import React from "react";
import HeaderSearchInput from "~/components/headerSearchInput";
import { useQuery } from "@tanstack/react-query";
import { fetchWordAutocompletes } from "~/requests";
import { useRouter } from "next/navigation";

export default function Header() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  const router = useRouter();

  function wordSelectionHandler(word: string) {
    setSearchInputValue("");
    router.push(`/word/${word}`);
  }

  return (
    <div className="z-50 mx-auto flex w-full flex-col gap-4 rounded-xl bg-[#1c1f2b] p-4 shadow-xl">
      <div className="flex flex-row items-center justify-center">
        <HeaderSearchInput
          value={searchInputValue}
          onChange={setSearchInputValue}
          placeholder="Search word"
          className="w-full max-w-md"
        />
      </div>
      <HeaderSearchResultsContainer
        searchInputValue={searchInputValue}
        onWordSelection={wordSelectionHandler}
      />
    </div>
  );
}

function HeaderSearchResultsContainer({
  searchInputValue,
  onWordSelection,
}: {
  searchInputValue: string;
  onWordSelection: (word: string) => void;
}) {
  const { data: wordsResults = [], isLoading } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["autocompleteWords", searchInputValue],
    queryFn: async (): Promise<string[]> => {
      if (!searchInputValue || searchInputValue.length < 2) {
        return [];
      }
      const res = await fetchWordAutocompletes(searchInputValue);
      if (res.isErr()) {
        return [];
      }
      return res.value;
    },
  });

  if (!searchInputValue || searchInputValue.length < 2) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (wordsResults.length === 0) {
    return <div className="mx-auto flex text-3xl font-semibold text-white">No results found</div>;
  }

  return (
    <div className="border-gray-700 mx-auto w-full max-w-[1000px] rounded-xl border bg-[#272b38] p-6 shadow-2xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {wordsResults?.map((word, idx) => (
          <div key={word} className="flex">
            <button
              className="hover:text-gray-300  w-full rounded-md bg-[#3a3f4b] px-4 py-3 text-lg text-white shadow-lg hover:bg-[#505564]"
              onClick={() => onWordSelection(word)}
            >
              {idx + 1}. {word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
