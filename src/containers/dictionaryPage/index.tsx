import React from "react";
import { USED_DICTS } from "~/constants/dicts";
import { RANDOM_COLORS } from "~/constants/colors";
import Image from "next/image";
import HeaderSearchContainer from "~/containers/header/headerSearchContainer";
import BookSvg from "~/components/svg/bookSvg";

export default function DictionaryShowContainer() {
  return (
    <div className="w-full">
      <Content />
      <Footer />
    </div>
  );
}

export function Content() {
  return (
    <div className="mx-auto my-16 flex w-11/12 flex-col items-center justify-center gap-2 rounded-sm bg-white py-8 shadow-xl xl:w-full xl:max-w-screen-xl">
      <div className="mb-16 flex w-full flex-grow flex-col gap-4">
        <h1 className="w-full text-center text-5xl font-semibold">Circassian Dictionary</h1>
        <HeaderSearchContainer />
      </div>
      <Image src="/fav/icon-1042x1042.png" width={300} height={300} alt="logo" />
      <p className="mb-4 w-11/12 text-center text-2xl md:w-1/2">
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
      <h1 className="mb-4 mt-16 text-center text-3xl font-bold">
        List of dictionaries used: {USED_DICTS.length}
      </h1>
      <div className="mb-4 text-center">
        <p className="text-sm">Supporting Languages: Kbd, En, Ady, Ar, Tu & Ru</p>
      </div>
      <div className="mx-auto flex w-11/12 flex-col justify-center gap-4">
        {USED_DICTS.map((dict, index) => {
          return (
            <div key={index} className="flex flex-row items-center justify-center gap-2">
              <BookSvg width="75px" height="75px" fill={RANDOM_COLORS[index]} />
              <div key={index} className="w-full rounded-lg">
                <h2 className="mb-2 text-base font-bold leading-none">{dict.title}</h2>
                <p className="mb-2 text-xs leading-none">
                  <span className="font-semibold leading-none">From:</span> {dict.fromLang} -
                  <span className="font-semibold leading-none"> To:</span> {dict.toLang}
                </p>
                <p className="text-xs leading-none">
                  <span className="font-semibold">Entries Count:</span> {dict.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="w-full bg-[#eeeeff] shadow-xl">
      <div className="mx-auto w-11/12 py-4">
        <div className="flex flex-col gap-0 text-center text-base leading-none md:text-lg lg:gap-2 lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl">
          <p>
            <span>You can contact us at: </span>
            <span className="font-bold leading-none">learncircassian@gmail.com</span>
          </p>
        </div>
        <div className="flex flex-col gap-0 text-center text-base leading-none md:text-lg lg:gap-2 lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl">
          <p>
            <span>You can get the dictionaries that we used at: </span>
            <span className="font-bold leading-none">
              https://github.com/bihoqo/circassian-dictionaries-collection
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
