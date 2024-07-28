import React, { useState } from "react";
import Keyboard, { KeyboardLayoutObject } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const RUSSIAN_LAYOUT: KeyboardLayoutObject = {
  default: [
    "\u0451 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
    "{lock} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}",
    "{shift} / \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
    ".com @ {space}",
  ],
  shift: [
    '\u0401 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
    "{tab} \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
    "{lock} \u0424 \u042b \u0412 \u0410 \u041F \u0420 \u041E \u041B \u0414 \u0416 \u042D {enter}",
    "{shift} | \u042F \u0427 \u0421 \u041C \u0418 \u0422 \u042C \u0411 \u042E , {shift}",
    ".com @ {space}",
  ],
};

const ARABIC_LAYOUT: KeyboardLayoutObject = {
  default: [
    "\u0630 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} \u0636 \u0635 \u062B \u0642 \u0641 \u063A \u0639 \u0647 \u062E \u062D \u062C \u062F \\",
    "{lock} \u0634 \u0633 \u064A \u0628 \u0644 \u0627 \u062A \u0646 \u0645 \u0643 \u0637 {enter}",
    "{shift} \u0626 \u0621 \u0624 \u0631 \u0644\u0627 \u0649 \u0629 \u0648 \u0632 \u0638 {shift}",
    ".com @ {space}",
  ],
  shift: [
    "\u0651 ! @ # $ % ^ & * ) ( _ + {bksp}",
    "{tab} \u064E \u064B \u064F \u064C \u0644\u0625 \u0625 \u2018 \u00F7 \u00D7 \u061B < > |",
    '{lock} \u0650 \u064D ] [ \u0644\u0623 \u0623 \u0640 \u060C / : " {enter}',
    "{shift} ~ \u0652 } { \u0644\u0622 \u0622 \u2019 , . \u061F {shift}",
    ".com @ {space}",
  ],
};

const ENGLISH_LAYOUT: KeyboardLayoutObject = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {search}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {search}',
    "{shift} Z X C V B N M < > ? {shift}",
    ".com @ {space}",
  ],
};

const TURKISH_LAYOUT: KeyboardLayoutObject = {
  default: [
    '" 1 2 3 4 5 6 7 8 9 0 * - # {bksp}',
    "{tab} q w e r t y u ı o p ğ ü [ ]",
    "{lock} a s d f g h j k l ş i , {search}",
    "{shift} < z x c v b n m ö ç . | $ € {shift}",
    ".com @ {space}",
  ],
  shift: [
    "é ! ' ^ + % & / ( ) = ? _ ~ {bksp}",
    "{tab} Q W E R T Y U I O P Ğ Ü { }",
    "{lock} A S D F G H J K L Ş İ ; {search}",
    "{shift} > Z X C V B N M Ö Ç : \\ ` ´ {shift}",
    ".com @ {space}",
  ],
};

const CIRCASSIAN_LAYOUT: KeyboardLayoutObject = {
  default: [
    "\u0451 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "\u04C0 \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
    "{lock} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {search}",
    "{shift} / \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
    ".com @ {space}",
  ],
  shift: [
    '\u0401 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
    "\u04C0 \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
    "{lock} \u0424 \u042b \u0412 \u0410 \u041F \u0420 \u041E \u041B \u0414 \u0416 \u042D {search}",
    "{shift} | \u042F \u0427 \u0421 \u041C \u0418 \u0422 \u042C \u0411 \u042E , {shift}",
    ".com @ {space}",
  ],
};

const layouts: Record<string, KeyboardLayoutObject> = {
  Circassian: CIRCASSIAN_LAYOUT,
  Russian: RUSSIAN_LAYOUT,
  Arabic: ARABIC_LAYOUT,
  English: ENGLISH_LAYOUT,
  Turkish: TURKISH_LAYOUT,
};

export default function KeyboardWrapper({
  inputValue,
  setInputValue,
  onSearchClick,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSearchClick: () => void;
}) {
  const [layoutName, setLayoutName] = useState("default");
  const [currentLayout, setCurrentLayout] = useState("Circassian");

  const onKeyPress = (clickedBtn: string) => {
    switch (clickedBtn) {
      case "{shift}":
      case "{lock}":
        setLayoutName(layoutName === "default" ? "shift" : "default");
        break;
      case "{bksp}":
        setInputValue(inputValue.slice(0, -1));
        break;
      case "{space}":
        setInputValue(`${inputValue} `);
        break;
      case "{search}":
        onSearchClick();
        break;
      case "{tab}":
        break;
      default:
        if (clickedBtn.length > 1) {
          console.error(`Button ${clickedBtn} is not supported`);
          return;
        }
        setInputValue(`${inputValue}${clickedBtn}`);
        break;
    }
  };

  const handleLayoutChange = (layout: string) => {
    setCurrentLayout(layout);
    setLayoutName("default");
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-4 flex justify-center">
        {Object.keys(layouts).map((layout) => (
          <button
            key={layout}
            className={`mx-1 rounded border px-4 py-2 ${
              currentLayout === layout ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleLayoutChange(layout)}
          >
            {layout}
          </button>
        ))}
      </div>
      <Keyboard
        layoutName={layoutName}
        onKeyPress={onKeyPress}
        layout={layouts[currentLayout] || ENGLISH_LAYOUT}
        display={{
          "{bksp}": "↵",
          "{enter}": " ",
          "{shift}": "shift",
          "{lock}": "caps",
          "{space}": " ",
          "{tab}": " ",
          "{search}": "search",
        }}
      />
    </div>
  );
}
