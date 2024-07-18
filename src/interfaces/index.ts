export interface NameToTwitter {
  userName: string;
  twitterName: string;
}

export type NumberOrString = number | string;

export interface GenericSvgProps {
  width?: string;
  height?: string;
  overrideClassName?: string;
  fill?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export interface ApiResponse<T> {
  msg: string;
  http_code: number;
  success: boolean;
  data: T;
}

export interface ApiPaginationResponse<T> {
  msg: string;
  http_code: number;
  success: boolean;
  data: {
    page: number;
    size: number;
    result: T[] | null;
    total_count: number;
  };
}

export interface WordDefinitionsResults {
  spelling: string;
  title: string;
  html: string;
  fromLang: string;
  toLang: string;
}

export function getAllSupportedLangs(): SupportedLang[] {
  return Object.values(SupportedLang);
}

export enum SupportedLang {
  Ady = "Ady",
  Kbd = "Kbd",
  En = "En",
  Ru = "Ru",
  Tr = "Tr",
  Ar = "Ar",
  He = "He",
}

export interface ApiAutocompleteResponse {
  key: string;
  from_langs: string[];
  toLangs: string[];
}

export interface Autocomplete {
  key: string;
  fromLangs: SupportedLang[];
  toLangs: SupportedLang[];
}
