import { API_URL } from "~/constants";
import axios, { AxiosResponse } from "axios";
import { ApiResponse, WordResult } from "~/interfaces";
import { err, ok, Result } from "neverthrow";
import queryString from "query-string";
import { regularWordToSafeWord } from "~/utils/safeWords";

export async function fetchWordAutocompletesPaginated(args: {
  word: string;
  page: number;
  size: number;
}): Promise<Result<string[], string>> {
  const wordAdjusted = regularWordToSafeWord(args.word).trim().toLowerCase();
  try {
    const params: String = queryString.stringify({
      page: args.page,
      size: args.size,
    });

    const url = `${API_URL}/public/autocomplete-paginated/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<string[]>> = await axios({
      method: "GET",
      url: url,
      params: params,
    });

    return ok(response.data.data);
  } catch (e) {
    return err(`Failed to fetch definitions for ${args.word}`);
  }
}

export async function fetchWordAutocompletes(word: string) {
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/autocomplete/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<string[]>> = await axios({
      method: "GET",
      url: url,
    });

    return ok(response.data.data);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}

export async function fetchWordAutocompletesWithVerbs(word: string) {
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/autocomplete-with-verbs/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<string[]>> = await axios({
      method: "GET",
      url: url,
    });

    return ok(response.data.data);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}

export async function fetchWordDefinitions(word: string): Promise<Result<WordResult[], string>> {
  const wordAdjusted = regularWordToSafeWord(word).trim().toLowerCase();
  try {
    const url = `${API_URL}/public/def/${wordAdjusted}`;
    const response: AxiosResponse<ApiResponse<WordResult[]>> = await axios({
      method: "GET",
      url: url,
    });

    return ok(response.data.data);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}
