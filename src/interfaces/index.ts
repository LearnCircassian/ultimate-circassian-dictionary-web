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

export interface WordObject {
  spelling: string;
  title: string;
  html: string;
  fromLang: string;
  toLang: string;
}
