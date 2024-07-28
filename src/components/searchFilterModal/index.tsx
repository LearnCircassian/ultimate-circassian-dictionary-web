import React, { useState } from "react";
import XSvg from "~/components/svg/xSvg";
import { cn } from "~/utils/classNames";
import { getAllSupportedLangs, SupportedLang } from "~/interfaces";
import { getSearchFilterPrefsCache, saveSearchFilterPrefsCache } from "~/cache/searchFilterPrefs";
import { useRouter } from "next/navigation";
import { CACHE_VERSION } from "~/constants/cache";
import { toastUtil } from "~/components/toast";

interface SearchFilterModalProps {
  hide: () => void;
}

export default function SearchFilterDialog({ hide }: SearchFilterModalProps) {
  const router = useRouter();
  const searchFilterPrefs = getSearchFilterPrefsCache();
  const [selectedFromLangCheckboxes, setSelectedFromLangCheckboxes] = useState<SupportedLang[]>(
    searchFilterPrefs.fromLang,
  );

  function discardClickHandler() {
    hide();
  }

  function acceptClickHandler() {
    hide();
    saveSearchFilterPrefsCache({
      fromLang: selectedFromLangCheckboxes,
      toLang: getAllSupportedLangs(),
      version: CACHE_VERSION,
    });
    router.refresh();
  }

  function handleSelectAllFromLang() {
    setSelectedFromLangCheckboxes(getAllSupportedLangs());
  }

  function handleDeselectAllFromLang() {
    setSelectedFromLangCheckboxes([]);
  }

  function handleFromLangCheckboxChange(lang: SupportedLang) {
    const isChecked = selectedFromLangCheckboxes.includes(lang);
    if (isChecked) {
      setSelectedFromLangCheckboxes(selectedFromLangCheckboxes.filter((l) => l !== lang));
    } else {
      setSelectedFromLangCheckboxes([...selectedFromLangCheckboxes, lang]);
    }
  }

  return (
    <div className="relative w-[407px] text-left shadow-xl">
      <div className="absolute left-1/2 top-0 size-6 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border border-gray-300 bg-[#b7edad]"></div>
      <div className="rounded-[10px] border border-gray-300 bg-[#f4fff1] p-6">
        <div className="-mx-6 -mt-6 flex items-center justify-between rounded-t-[10px] border-b border-solid border-gray-300 bg-[#b7edad] px-6 py-4">
          <p className="text-lg font-semibold text-gray-900">Search Filter Preferences</p>
          <XSvg onClick={hide} overrideClassName="cursor-pointer hover:opacity-70" />
        </div>
        <div className="flex flex-col gap-6 pt-4">
          <p className="text-xl">
            <span className="font-bold">Note:</span>
            <span> Applying filters here will hide results from the search autocomplete.</span>
          </p>
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between border-b border-solid border-gray-300 pb-2">
                <p className="text-md font-semibold text-gray-900">From Language</p>
                <div className="flex gap-2">
                  <button
                    className="text-green-700 hover:text-green-600"
                    onClick={handleSelectAllFromLang}
                  >
                    Select All
                  </button>
                  <button
                    className="text-red-700 hover:text-red-600"
                    onClick={handleDeselectAllFromLang}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {getAllSupportedLangs().map((lang) => (
                  <div key={lang} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`fromLang-${lang}`}
                      checked={selectedFromLangCheckboxes.includes(lang)}
                      onChange={() => handleFromLangCheckboxChange(lang)}
                      className="form-checkbox size-5 text-blue-600"
                    />
                    <label htmlFor={`fromLang-${lang}`} className="text-md text-gray-900">
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4 border-t border-solid border-gray-300 pt-4">
          <button
            className="text-md px-4 py-2 text-gray-900 hover:text-gray-400"
            onClick={discardClickHandler}
          >
            Discard
          </button>
          <button
            className={cn("text-md rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400", {
              "cursor-not-allowed opacity-50": selectedFromLangCheckboxes.length === 0,
            })}
            disabled={selectedFromLangCheckboxes.length === 0}
            onClick={acceptClickHandler}
          >
            Accept Filters
          </button>
        </div>
      </div>
    </div>
  );
}
