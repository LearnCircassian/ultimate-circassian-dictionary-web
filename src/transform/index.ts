import {
  ApiAutocompleteResponse,
  ApiWordDefinitionsResultsResponse,
  Autocomplete,
  getSupportedLangForString,
  WordDefinitionsResults,
} from "~/interfaces";
import {
  replaceAllOneToPalochka,
  replaceAllPalochkaLettersToOne,
  safeWordToRegularWord,
} from "~/utils/wordFormatting";

export function transformAutocomplete(a: ApiAutocompleteResponse): Autocomplete {
  // Transform the key from safe word to regular word
  let safeKey = safeWordToRegularWord(a.key);
  safeKey = replaceAllOneToPalochka(safeKey);

  // Transform the languages from string to SupportedLang enum
  const fromLangs = a.from_langs.map(getSupportedLangForString);

  // Transform the languages from string to SupportedLang enum
  const toLangs = a.toLangs.map(getSupportedLangForString);

  // Return the transformed autocomplete
  return { key: safeKey, fromLangs, toLangs };
}

export function transformWordDefinitionsResults(
  a: ApiWordDefinitionsResultsResponse,
): WordDefinitionsResults {
  // Transform the spelling from safe word to regular word
  a.spelling = safeWordToRegularWord(a.spelling);
  a.spelling = replaceAllPalochkaLettersToOne(a.spelling);

  // Transform the title from safe word to regular word
  a.html = replaceAllPalochkaLettersToOne(a.html);

  // Return the transformed word definitions results
  return {
    spelling: a.spelling,
    title: a.title,
    html: a.html,
    fromLang: a.from_lang.map(getSupportedLangForString),
    toLang: a.to_lang.map(getSupportedLangForString),
  };
}
