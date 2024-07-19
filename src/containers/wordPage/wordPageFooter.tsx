import { cn } from "~/utils/classNames";
import { HiArrowLeft, HiArrowRight, HiHome, HiFilter } from "react-icons/hi";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { regularWordToSafeWord, safeWordToRegularWord } from "~/utils/wordFormatting";
import { findLeftAndRightOfCachedWord } from "~/cache/wordHistory";
import useModal from "~/hooks/useModal"; // Import useModal hook if it's defined elsewhere in your project

export default function WordPageFooter() {
  const params = useParams<{ word: string }>();
  const router = useRouter();
  const { show, hide } = useModal(); // Use the useModal hook here

  const { data: footerWords = { leftFooterBtnWord: "", rightFooterBtnWord: "" } } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["footerWords", params?.word],
    queryFn: async () => {
      if (!params || !params.word || params.word.trim() === "") {
        return { leftFooterBtnWord: "", rightFooterBtnWord: "" };
      }
      const safeWord = safeWordToRegularWord(params.word);
      const { left, right } = findLeftAndRightOfCachedWord(safeWord);
      return { leftFooterBtnWord: left, rightFooterBtnWord: right };
    },
  });

  function clickWordHandler(word: string) {
    const safeWord = regularWordToSafeWord(word);

    // Check if safeWord is contained in the current URL
    if (params && "word" in params && params.word === safeWord) {
      console.log("Word already in URL");
      return;
    }

    router.push(`/word/${safeWord}`);
  }

  function filterOptionClickHandler() {
    router.push(`/search-filter-preferences/`);
  }

  return (
    <footer className="fixed bottom-0 z-30 flex w-full items-center justify-between bg-white p-2 shadow-md sm:hidden">
      <button
        className={cn("flex flex-col items-center justify-center flex-1", {
          "opacity-30": !footerWords.leftFooterBtnWord,
        })}
        disabled={!footerWords.leftFooterBtnWord}
        onClick={() => clickWordHandler(footerWords.leftFooterBtnWord)}
      >
        <HiArrowLeft size={36} className="rounded-full bg-[#FFFFFF66] p-2 text-black" />
        <span className="text-md text-black">{footerWords.leftFooterBtnWord}</span>
      </button>
      <button
        className="flex flex-1 flex-col items-center justify-center"
        onClick={() => router.push("/")}
      >
        <HiHome size={36} className="rounded-full bg-[#FFFFFF66] p-2 text-black" />
        <span className="text-md text-black">Home</span>
      </button>
      <button
        className="flex flex-1 flex-col items-center justify-center"
        onClick={filterOptionClickHandler}
      >
        <HiFilter size={36} className="rounded-full bg-[#FFFFFF66] p-2 text-black" />
        <span className="text-md text-black">Filter</span>
      </button>
      <button
        className={cn("flex flex-col items-center justify-center flex-1", {
          "opacity-30": !footerWords.rightFooterBtnWord,
        })}
        disabled={!footerWords.rightFooterBtnWord}
        onClick={() => clickWordHandler(footerWords.rightFooterBtnWord)}
      >
        <HiArrowRight size={36} className="rounded-full bg-[#FFFFFF66] p-2 text-black" />
        <span className="text-md text-black">{footerWords.rightFooterBtnWord}</span>
      </button>
    </footer>
  );
}
