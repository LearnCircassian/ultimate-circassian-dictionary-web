import { API_URL } from "~/constants";
import axios, { AxiosResponse } from "axios";
import {
  ApiAutocompleteResponse,
  ApiResponse,
  Autocomplete,
  WordDefinitionsResults,
} from "~/interfaces";
import { err, ok, Result } from "neverthrow";
import queryString from "query-string";
import { regularWordToSafeWord, safeWordToRegularWord } from "~/utils/safeWords";
import { transformAutocomplete } from "~/transform";

export async function fetchWordAutocompletesPaginated(args: {
  word: string;
  page: number;
  size: number;
}): Promise<Result<Autocomplete[], string>> {
  const wordAdjusted = regularWordToSafeWord(args.word).trim().toLowerCase();
  try {
    const params: String = queryString.stringify({
      page: args.page,
      size: args.size,
    });

    const url = `${API_URL}/public/autocomplete-paginated/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<ApiAutocompleteResponse[]>> = await axios({
      method: "GET",
      url: url,
      params: params,
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
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/autocomplete/${wordAdjusted}`;
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
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/autocomplete-that-contains/${wordAdjusted}`;
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

export async function fetchWordAutocompletesWithVerbs(
  word: string,
): Promise<Result<Autocomplete[], string>> {
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/autocomplete-with-verbs/${wordAdjusted}`;
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

export async function fetchWordDefinitions(
  word: string,
): Promise<Result<WordDefinitionsResults[], string>> {
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/def/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<WordDefinitionsResults[]>> = await axios({
      method: "GET",
      url: url,
    });

    const result = response.data.data;
    for (const r of result) {
      r.spelling = safeWordToRegularWord(r.spelling);
    }
    return ok(result);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}
