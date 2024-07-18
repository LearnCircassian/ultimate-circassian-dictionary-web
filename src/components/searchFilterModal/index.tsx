import React, { useState } from "react";
import XSvg from "~/components/svg/xSvg";
import { cn } from "~/utils/classNames";
import { SupportedLang } from "~/interfaces";
import { getSearchFilterPrefsCache, saveSearchFilterPrefsCache } from "~/cache/searchFilterPrefs";
import { useRouter } from "next/navigation"; // Assuming SupportedLang enum is imported from interfaces

interface SearchFilterModalProps {
  hide: () => void;
}

export default function SearchFilterModal({ hide }: SearchFilterModalProps) {
  const router = useRouter();
  const searchFilterPrefs = getSearchFilterPrefsCache();
  const [selectedFromLangCheckboxes, setSelectedFromLangCheckboxes] = useState<SupportedLang[]>(
    searchFilterPrefs.fromLang,
  );
  const [selectedToLangCheckboxes, setSelectedToLangCheckboxes] = useState<SupportedLang[]>(
    searchFilterPrefs.toLang,
  );

  function discardClickHandler() {
    hide();
  }

  function acceptClickHandler() {
    hide();
    saveSearchFilterPrefsCache({
      fromLang: selectedFromLangCheckboxes,
      toLang: selectedToLangCheckboxes,
    });
    router.refresh();
  }

  function handleSelectAllFromLang() {
    setSelectedFromLangCheckboxes(Object.values(SupportedLang));
  }

  function handleSelectAllToLang() {
    setSelectedToLangCheckboxes(Object.values(SupportedLang));
  }

  function handleDeselectAllFromLang() {
    setSelectedFromLangCheckboxes([]);
  }

  function handleDeselectAllToLang() {
    setSelectedToLangCheckboxes([]);
  }

  function handleFromLangCheckboxChange(lang: SupportedLang) {
    const isChecked = selectedFromLangCheckboxes.includes(lang);
    if (isChecked) {
      setSelectedFromLangCheckboxes(selectedFromLangCheckboxes.filter((l) => l !== lang));
    } else {
      setSelectedFromLangCheckboxes([...selectedFromLangCheckboxes, lang]);
    }
  }

  function handleToLangCheckboxChange(lang: SupportedLang) {
    const isChecked = selectedToLangCheckboxes.includes(lang);
    if (isChecked) {
      setSelectedToLangCheckboxes(selectedToLangCheckboxes.filter((l) => l !== lang));
    } else {
      setSelectedToLangCheckboxes([...selectedToLangCheckboxes, lang]);
    }
  }

  return (
    <div className="w-[600px] rounded-[11px] bg-[#161619] text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      {/* Top section */}
      <div className="flex flex-row items-center justify-between border-b border-solid border-[#27272C] p-4">
        <div className="flex flex-row items-center gap-2">
          <p className="flex text-base font-semibold text-white">Search filter preferences</p>
        </div>
        <XSvg onClick={hide} overrideClassName="cursor-pointer hover:opacity-70" />
      </div>
      {/* Center section */}
      <div className="flex flex-col gap-8 px-4 py-8">
        <div className="flex gap-8">
          {/* From Language filters */}
          <div className="flex-1">
            <div className="flex items-center justify-between border-b border-solid border-[#27272C] py-2">
              <p className="text-lg font-semibold text-white">From Language</p>
              <div className="flex gap-2">
                <button
                  className="text-[#68D391] hover:text-[#68D391]/70"
                  onClick={handleSelectAllFromLang}
                >
                  Select All
                </button>
                <button
                  className="text-[#FF6B6B] hover:text-[#FF6B6B]/70"
                  onClick={handleDeselectAllFromLang}
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {Object.values(SupportedLang).map((lang) => (
                <div key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`fromLang-${lang}`}
                    checked={selectedFromLangCheckboxes.includes(lang)}
                    onChange={() => handleFromLangCheckboxChange(lang)}
                    className="size-4 sm:size-5 md:size-6 lg:size-7 xl:size-8 2xl:size-9 3xl:size-10"
                  />
                  <label
                    htmlFor={`fromLang-${lang}`}
                    className="lg:text-md text-base text-white xl:text-lg 2xl:text-xl 3xl:text-2xl"
                  >
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* To Language filters */}
          <div className="flex-1">
            <div className="flex items-center justify-between border-b border-solid border-[#27272C] py-2">
              <p className="text-lg font-semibold text-white">To Language</p>
              <div className="flex gap-2">
                <button
                  className="text-[#68D391] hover:text-[#68D391]/70"
                  onClick={handleSelectAllToLang}
                >
                  Select All
                </button>
                <button
                  className="text-[#FF6B6B] hover:text-[#FF6B6B]/70"
                  onClick={handleDeselectAllToLang}
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {Object.values(SupportedLang).map((lang) => (
                <div key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`toLang-${lang}`}
                    checked={selectedToLangCheckboxes.includes(lang)}
                    onChange={() => handleToLangCheckboxChange(lang)}
                    className="size-4 sm:size-5 md:size-6 lg:size-7 xl:size-8 2xl:size-9 3xl:size-10"
                  />
                  <label
                    htmlFor={`toLang-${lang}`}
                    className="lg:text-md text-base text-white xl:text-lg 2xl:text-xl 3xl:text-2xl"
                  >
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex flex-row justify-end gap-6 rounded-b-[11px] border-t border-solid border-[#27272C] bg-[#1F1F22] p-4">
        <button
          className="px-4 py-2 text-lg text-white hover:text-gray"
          onClick={discardClickHandler}
        >
          Discard
        </button>
        <button
          className={cn(
            "my-2 rounded-[8px] bg-[#E6E6E6] px-4 py-2 text-lg text-black hover:bg-[#E6E6E6]/90",
            {
              "cursor-not-allowed opacity-50":
                selectedFromLangCheckboxes.length === 0 || selectedToLangCheckboxes.length === 0,
            },
          )}
          disabled={
            selectedFromLangCheckboxes.length === 0 || selectedToLangCheckboxes.length === 0
          }
          onClick={acceptClickHandler}
        >
          Accept filters
        </button>
      </div>
    </div>
  );
}
