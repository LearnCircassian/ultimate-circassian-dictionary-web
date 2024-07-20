import React from "react";
import { USED_DICTS } from "~/constants/dicts";
import { RANDOM_COLORS } from "~/constants/colors";

export default function HomePageContainer() {
  return (
    <div className="container mx-auto my-8">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Dictionaries Used: {USED_DICTS.length}
      </h1>
      <div className="mb-4 text-center">
        <p className="text-sm">Supporting Languages: Kbd, En, Ady, Ar, Tu & Ru</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
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
      <div className="mt-4 flex flex-col items-center justify-center gap-8 p-4">
        <p className="whitespace-normal break-words text-center text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl">
          You can content us at:
          <br />
          <span className="font-bold">learncircassian@gmail.com</span>
        </p>
        <p className="whitespace-normal break-words text-center text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl">
          You can get the dictionaries that we used at:
          <br />{" "}
          <span className="font-bold">
            https://github.com/bihoqo/circassian-dictionaries-collection
          </span>
        </p>
      </div>
    </div>
  );
}
