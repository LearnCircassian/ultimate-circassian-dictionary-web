import React from "react";
import { USED_DICTS } from "~/constants/dicts";
import { RANDOM_COLORS } from "~/constants/colors";

export function Footer() {
  return (
    <footer className="mt-4 bg-[#a1d199] p-6 text-center">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-sm md:text-base lg:text-lg">You can contact us at:</p>
        <p className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">learncircassian@gmail.com</p>
        <p className="text-sm md:text-base lg:text-lg">
          You can get the dictionaries that we used at:
        </p>
        <a
          href="https://github.com/bihoqo/circassian-dictionaries-collection"
          className="text-lg font-bold underline md:text-xl lg:text-2xl"
        >
          Circassian Dictionaries Collection
        </a>
      </div>
    </footer>
  );
}

function DictionaryShowContainer() {
  return (
    <div
      className="
      container 
      mx-auto my-8
      mr-4 max-w-[500px]"
    >
      <h1 className="mb-4 text-center text-3xl font-bold">
        Dictionaries Used: {USED_DICTS.length}
      </h1>
      <div className="mb-4 text-center">
        <p className="text-sm">Supporting Languages: Kbd, En, Ady, Ar, Tu & Ru</p>
      </div>
      {/* Scrollable container for dictionaries */}
      <div className="ml-auto mr-4  grid max-h-[400px] grid-cols-1 gap-4 overflow-auto">
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

export default function HomePageContainer() {
  return (
    <div>
      <DictionaryShowContainer />
      <Footer />
    </div>
  );
}
