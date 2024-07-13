import React from "react";
import { WordObject } from "~/interfaces";

interface WordPageContainerProps {
  wordDefinitions: WordObject[];
  wordSpelling: string;
}

export default function WordPageContainer({
  wordDefinitions,
  wordSpelling,
}: WordPageContainerProps) {
  return (
    <div className="">
      <h1 className="text-4xl text-white">{wordSpelling}</h1>
      {wordDefinitions.map((wd, idx) => {
        return (
          <div key={idx}>
            <p className="text-white">{wd.html}</p>
          </div>
        );
      })}
    </div>
  );
}
