import { API_URL } from "~/constants";
import axios, { AxiosResponse } from "axios";
import {
  ApiAutocompleteResponse,
  ApiResponse,
  ApiWordDefinitionsResultsResponse,
  Autocomplete,
  WordDefinitionsResults,
} from "~/interfaces";
import { err, ok, Result } from "neverthrow";
import queryString from "query-string";
import {
  regularWordToSafeWord,
  replaceStickLettersToOne,
  safeWordToRegularWord,
} from "~/utils/wordFormatting";
import { transformAutocomplete, transformWordDefinitionsResults } from "~/transform";
import { getSearchFilterPrefsCache } from "~/cache/searchFilterPrefs";

export async function fetchWordAutocompletesPaginated(args: {
  word: string;
  page: number;
  size: number;
}): Promise<Result<Autocomplete[], string>> {
  let wordAdjusted = regularWordToSafeWord(args.word).trim().toLowerCase();
  wordAdjusted = replaceStickLettersToOne(wordAdjusted);
  const searchFilterPrefs = getSearchFilterPrefsCache();

  try {
    const params: String = queryString.stringify({
      page: args.page,
      size: args.size,
      fromLangs: searchFilterPrefs.fromLang.join(","),
      toLangs: searchFilterPrefs.toLang.join(","),
    });

    const url = `${API_URL}/public/autocomplete-paginated/${wordAdjusted}?${params}`;
    const response: AxiosResponse<ApiResponse<ApiAutocompleteResponse[]>> = await axios({
      method: "GET",
      url: url,
    });

    const rawResults = response.data.data;
    const transformedResults = rawResults.map(transformAutocomplete);
    return ok(transformedResults);
  } catch (e) {
    return err(`Failed to fetch definitions for ${args.word}`);
  }
}

export async function fetchWordAutocompletes(
  word: string,
): Promise<Result<Autocomplete[], string>> {
  let wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  wordAdjusted = replaceStickLettersToOne(wordAdjusted);

  const searchFilterPrefs = getSearchFilterPrefsCache();
  const params: String = queryString.stringify({
    fromLangs: searchFilterPrefs.fromLang.join(","),
    toLangs: searchFilterPrefs.toLang.join(","),
  });

  try {
    const url = `${API_URL}/public/autocomplete/${wordAdjusted}?${params}`;
    const response: AxiosResponse<ApiResponse<ApiAutocompleteResponse[]>> = await axios({
      method: "GET",
      url: url,
    });

    const rawResults = response.data.data;
    const transformedResults = rawResults.map(transformAutocomplete);
    return ok(transformedResults);
  } catch (e) {
    console.error(`Failed to fetch autocompletes for ${word}`, e);
    return err(`Failed to fetch definitions for ${word}`);
  }
}

export async function fetchWordAutocompletesThatContains(
  word: string,
): Promise<Result<Autocomplete[], string>> {
  let wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  wordAdjusted = replaceStickLettersToOne(wordAdjusted);

  const searchFilterPrefs = getSearchFilterPrefsCache();
  const params: String = queryString.stringify({
    fromLangs: searchFilterPrefs.fromLang.join(","),
    toLangs: searchFilterPrefs.toLang.join(","),
  });

  try {
    const url = `${API_URL}/public/autocomplete-that-contains/${wordAdjusted}?${params}`;
    const response: AxiosResponse<ApiResponse<ApiAutocompleteResponse[]>> = await axios({
      method: "GET",
      url: url,
    });

    const rawResults = response.data.data;
    const transformedResults = rawResults.map(transformAutocomplete);
    return ok(transformedResults);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}

export async function fetchEnglishWordAutocompletesWithVerbs(
  word: string,
): Promise<Result<Autocomplete[], string>> {
  let wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  wordAdjusted = replaceStickLettersToOne(wordAdjusted);

  const searchFilterPrefs = getSearchFilterPrefsCache();
  const params: String = queryString.stringify({
    fromLangs: searchFilterPrefs.fromLang.join(","),
    toLangs: searchFilterPrefs.toLang.join(","),
  });

  try {
    const url = `${API_URL}/public/autocomplete-with-verbs/${wordAdjusted}?${params}`;
    const response: AxiosResponse<ApiResponse<ApiAutocompleteResponse[]>> = await axios({
      method: "GET",
      url: url,
    });

    const rawResults = response.data.data;
    const transformedResults = rawResults.map(transformAutocomplete);
    return ok(transformedResults);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}

export async function fetchExactWordDefinitions(
  word: string,
): Promise<Result<WordDefinitionsResults[], string>> {
  let wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  wordAdjusted = replaceStickLettersToOne(wordAdjusted);

  try {
    const url = `${API_URL}/public/def/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<ApiWordDefinitionsResultsResponse[]>> = await axios({
      method: "GET",
      url: url,
    });

    const rawResults = response.data.data;
    const transformedResults = rawResults.map(transformWordDefinitionsResults);
    return ok(transformedResults);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}
