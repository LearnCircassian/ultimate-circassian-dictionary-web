import { ApiAutocompleteResponse, Autocomplete, SupportedLang } from "~/interfaces";
import { replaceAllOneToPalochka, safeWordToRegularWord } from "~/utils/wordFormatting";

export function transformAutocomplete(a: ApiAutocompleteResponse): Autocomplete {
  // Transform the key from safe word to regular word
  let safeKey = safeWordToRegularWord(a.key);
  safeKey = replaceAllOneToPalochka(safeKey);

  // Transform the languages from string to SupportedLang enum
  const fromLangs = a.from_langs.map((lang) => {
    const supportedLang = SupportedLang[lang as keyof typeof SupportedLang];
    if (!supportedLang) {
      throw new Error(`Invalid language enum: ${lang}`);
    }
    return supportedLang;
  });

  // Transform the languages from string to SupportedLang enum
  const toLangs = a.toLangs.map((lang) => {
    const supportedLang = SupportedLang[lang as keyof typeof SupportedLang];
    if (!supportedLang) {
      throw new Error(`Invalid language enum: ${lang}`);
    }
    return supportedLang;
  });

  // Return the transformed autocomplete
  return { key: safeKey, fromLangs, toLangs };
}
