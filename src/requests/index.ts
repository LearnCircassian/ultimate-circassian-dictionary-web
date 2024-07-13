import { API_URL } from "~/constants";
import axios, { AxiosResponse } from "axios";
import { ApiResponse, WordObject } from "~/interfaces";
import { err, ok, Result } from "neverthrow";
import queryString from "query-string";

export async function fetchWordAutocompletesPaginated(args: {
  word: string;
  page: number;
  size: number;
}): Promise<Result<string[], string>> {
  try {
    const params: String = queryString.stringify({
      page: args.page,
      size: args.size,
    });

    const url = `${API_URL}/public/autocomplete-paginated/${args.word.toLowerCase()}`;
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
  try {
    const url = `${API_URL}/public/autocomplete/${word.toLowerCase()}`;
    const response: AxiosResponse<ApiResponse<string[]>> = await axios({
      method: "GET",
      url: url,
    });

    return ok(response.data.data);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}

export async function fetchWordDefinitions(word: string): Promise<Result<WordObject[], string>> {
  try {
    const url = `${API_URL}/public/def/${word.toLowerCase()}`;
    const response: AxiosResponse<ApiResponse<WordObject[]>> = await axios({
      method: "GET",
      url: url,
    });

    return ok(response.data.data);
  } catch (e) {
    return err(`Failed to fetch definitions for ${word}`);
  }
}
