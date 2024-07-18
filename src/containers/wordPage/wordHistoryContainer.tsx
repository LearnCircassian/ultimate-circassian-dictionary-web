import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  findAllAutocompletesInWordHistoryCache,
  removeFromWordHistoryCache,
} from "~/cache/wordHistory";
import { cn } from "~/utils/classNames";
import { HiChevronDown } from "react-icons/hi";
import { regularWordToSafeWord } from "~/utils/wordFormatting";
import { useParams, useRouter } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa"; // Import the X icon

export default function WordHistoryContainer() {
  const router = useRouter();
  const params = useParams<{ word: string }>();
  const { data: myWordHistory = [] as string[], refetch: refetchMyWordHistory } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    retry: 1,
    queryKey: ["myWordHistory"],
    queryFn: async (): Promise<string[]> => {
      return findAllAutocompletesInWordHistoryCache();
    },
  });

  function clickWordHandler(word: string) {
    const safeWord = regularWordToSafeWord(word);

    // Check if safeWord is contained in the current URL
    if ("word" in params && params.word === safeWord) {
      console.log("Word already in URL");
      return;
    }

    router.push(`/word/${safeWord}`);
  }

  function onDeleteClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, word: string) {
    event.stopPropagation(); // Prevent click propagation to the word click handler
    removeFromWordHistoryCache(word);
    refetchMyWordHistory();
  }

  return (
    <div className={cn("flex w-full flex-col")}>
      <div className="flex w-full items-center justify-between rounded-t-2xl bg-[#adb3ed] px-4 py-2 font-bold shadow">
        <span className={cn("2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-md")}>
          Search History
        </span>
        <HiChevronDown className="ml-2" />
      </div>
      <div
        className={cn(
          "bg-[#f1f1ff] p-2 text-black shadow-sm rounded-b-2xl",
          "2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm",
        )}
      >
        <p className={cn({ hidden: myWordHistory.length > 0 })}>Your search history is empty</p>
        {myWordHistory.map((word, index) => {
          return (
            <div key={index} className="group flex items-center justify-between p-2">
              <span
                className="truncate hover:cursor-pointer hover:underline"
                onClick={() => clickWordHandler(word)}
              >
                {word}
              </span>
              <button
                onClick={(event) => onDeleteClick(event, word)}
                className="flex items-center opacity-0 group-hover:opacity-100 "
              >
                <FaTimesCircle className="opacity-80" size={20} color="#757575" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
