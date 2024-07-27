import React from "react";
import { USED_DICTS } from "~/constants/dicts";
import { RANDOM_COLORS } from "~/constants/colors";
import Image from "next/image";

export default function clsclsHomePageContainer() {
  return (
    <div>
      <Content />
      <Footer />
    </div>
  );
}

export function Content() {
  return (
    <div className="mx-auto my-8 flex w-3/5 flex-col items-center justify-center gap-2 rounded-md bg-white py-8 shadow-2xl">
      <Image src="/fav/icon-1042x1042.png" width={300} height={300} alt="logo" />
      <p className="mb-4 text-center text-xl md:w-1/2">
        Welcome to our comprehensive collection of Circassian language dictionaries! Our website is
        dedicated to preserving and promoting the rich linguistic heritage of the Circassian people
        by providing access to over 30 different dictionaries. These dictionaries encompass
        translations between Circassian and several major languages: Russian, English, Arabic, and
        Turkish.
        <br />
        <br />
        Our collection includes dictionaries for both Western and Eastern Circassian, translating to
        and from Turkish, English, Russian, and Arabic.
        <br />
        <br />
        Whether you are a language enthusiast, a student, or a scholar, our extensive collection
        offers valuable resources for learning and researching the Circassian language. Dive into
        our website to explore the beauty and complexity of Circassian, a language spoken by the
        Circassian people with a rich cultural history.
      </p>
      <h1 className="mb-4 text-center text-3xl font-bold">
        List of dictionaries used: {USED_DICTS.length}
      </h1>
      <div className="mb-4 text-center">
        <p className="text-sm">Supporting Languages: Kbd, En, Ady, Ar, Tu & Ru</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {USED_DICTS.map((dict, index) => (
          <div
            key={index}
            className="w-full max-w-[300px] rounded-lg p-2 shadow-md md:w-1/2"
            style={{ backgroundColor: RANDOM_COLORS[index] }}
          >
            <h2 className="mb-2 text-base font-bold leading-none">{dict.title}</h2>
            <p className="mb-2 text-xs leading-none">
              <span className="font-semibold">From:</span> {dict.fromLang} -
              <span className="font-semibold"> To:</span> {dict.toLang}
            </p>
            <p className="text-xs leading-none">
              <span className="font-semibold">Entries Count:</span> {dict.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="w-full bg-[#eeeeff] shadow-xl">
      <div className="mx-auto flex w-1/2 flex-col items-center justify-between gap-2 p-4 md:gap-8 lg:flex-row 2xl:gap-16">
        <p className="flex flex-col gap-0 whitespace-normal break-words text-center text-base leading-none md:text-lg lg:gap-2 lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl">
          You can contact us at:
          <br />
          <span className="font-bold  leading-none">learncircassian@gmail.com</span>
        </p>
        <p className="flex flex-col gap-0 whitespace-normal break-words text-center text-base leading-none md:text-lg lg:gap-2 lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl">
          You can get the dictionaries that we used at:
          <br />{" "}
          <span className="font-bold  leading-none">
            https://github.com/bihoqo/circassian-dictionaries-collection
          </span>
        </p>
      </div>
    </div>
  );
}
