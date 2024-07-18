import { getAllSupportedLangs, SupportedLang } from "~/interfaces";
import { SEARCH_FILTER_PREFS_CACHE_KEY } from "~/constants/cache";

interface SearchFilterPrefs {
  fromLang: SupportedLang[];
  toLang: SupportedLang[];
}

export function getSearchFilterPrefsCache(): SearchFilterPrefs {
  const searchFilterPrefs = localStorage.getItem(SEARCH_FILTER_PREFS_CACHE_KEY);
  if (!searchFilterPrefs) {
    return {
      fromLang: getAllSupportedLangs(),
      toLang: getAllSupportedLangs(),
    };
  }
  return JSON.parse(searchFilterPrefs);
}

export function saveSearchFilterPrefsCache(searchFilterPrefs: SearchFilterPrefs) {
  localStorage.setItem(SEARCH_FILTER_PREFS_CACHE_KEY, JSON.stringify(searchFilterPrefs));
}

export function clearSearchFilterPrefs() {
  localStorage.removeItem(SEARCH_FILTER_PREFS_CACHE_KEY);
}

export function resetSearchFilterPrefs() {
  saveSearchFilterPrefsCache({
    fromLang: getAllSupportedLangs(),
    toLang: getAllSupportedLangs(),
  });
}
