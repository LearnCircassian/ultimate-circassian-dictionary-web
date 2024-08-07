import React from "react";
import { USED_DICTS } from "~/constants/dicts";
import { RANDOM_COLORS } from "~/constants/colors";
import Image from "next/image";
import SearchContainer from "~/containers/header/searchContainer";
import BookSvg from "~/components/svg/bookSvg";
import ContainerDiv from "../../components/containerDiv";

export default function DictionaryShowContainer() {
  return (
    <div className="w-full">
      <Content />
    </div>
  );
}

export function Content() {
  return (
    <ContainerDiv>
      <div className="mb-16 flex w-full flex-grow flex-col gap-4">
        <h1 className="w-full text-center text-5xl font-semibold">Circassian Dictionary</h1>
        <SearchContainer showOnMobile={false} />
      </div>
      <Image src="/fav/icon-1042x1042.png" width={300} height={300} alt="logo" />
      <p className="mt-8 w-11/12 text-center text-2xl md:w-1/2">
        Welcome to our dedicated platform for preserving the Circassian language! Our mission is to
        keep this rich linguistic heritage alive by offering access to over 30 comprehensive
        dictionaries. These dictionaries facilitate translations between Circassian and major
        languages including Russian, English, Arabic, and Turkish.
        <br />
        <br />
        Our collection spans both Western and Eastern Circassian, enabling translations to and from
        Turkish, English, Russian, and Arabic. We aim to assist Circassians from all over the world
        in understanding advanced Circassian texts such as newspapers, Nart Saga stories, articles,
        and more.
        <br />
        <br />
        Explore our website to immerse yourself in the beauty and complexity of the Circassian
        language, and join us in our endeavor to ensure its survival for future generations.
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
    </ContainerDiv>
  );
}
