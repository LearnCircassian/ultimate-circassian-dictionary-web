import React from "react";
import { USED_DICTS } from "~/constants/dicts";
import { RANDOM_COLORS } from "~/constants/colors";
import DictionarySearchContainer from "~/containers/dictionaryPage/dictionarySearchContainer";

function DictionaryShowContainer() {
  return (
    <div className="container mx-auto my-8 mr-4 max-w-[500px]">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Dictionaries Used: {USED_DICTS.length}
      </h1>
      <div className="mb-4 text-center">
        <p className="text-sm">Supporting Languages: Kbd, En, Ady, Ar, Tu & Ru</p>
      </div>
      {/* Scrollable container for dictionaries */}
      <div className="ml-auto mr-4 grid max-h-[400px] grid-cols-1 gap-4 overflow-auto">
        {USED_DICTS.map((dict, index) => (
          <div
            key={index}
            className="rounded-lg p-4 shadow-md"
            style={{ backgroundColor: RANDOM_COLORS[index] }}
          >
            <h2 className="mb-2 text-lg font-bold">{dict.title}</h2>
            <p className="mb-2 text-sm">
              <span className="font-semibold">From:</span> {dict.fromLang} -
              <span className="font-semibold"> To:</span> {dict.toLang}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Entries Count:</span> {dict.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DictionaryContainer() {
  return (
    <div>
      <div className="flex flex-grow flex-col gap-2">
        <DictionarySearchContainer />
      </div>
      <DictionaryShowContainer />
    </div>
  );
}
