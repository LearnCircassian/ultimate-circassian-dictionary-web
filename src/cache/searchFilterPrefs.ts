import { getAllSupportedLangs, SupportedLang } from "~/interfaces";
import { SEARCH_FILTER_PREFS_CACHE_KEY } from "~/constants/cache";

interface SearchFilterPrefs {
  fromLang: SupportedLang[];
  toLang: SupportedLang[];
}

const DEFAULT_SEARCH_FILTER_PREFS: SearchFilterPrefs = {
  fromLang: getAllSupportedLangs(),
  toLang: getAllSupportedLangs(),
};

export function getSearchFilterPrefsCache(): SearchFilterPrefs {
  try {
    if (typeof window === "undefined") {
      return DEFAULT_SEARCH_FILTER_PREFS;
    }
    const searchFilterPrefs = localStorage.getItem(SEARCH_FILTER_PREFS_CACHE_KEY);
    if (!searchFilterPrefs) {
      saveSearchFilterPrefsCache(DEFAULT_SEARCH_FILTER_PREFS);
      return DEFAULT_SEARCH_FILTER_PREFS;
    }
    return JSON.parse(searchFilterPrefs);
  } catch (err) {
    _clearSearchFilterPrefs();
    return DEFAULT_SEARCH_FILTER_PREFS;
  }
}

export function saveSearchFilterPrefsCache(searchFilterPrefs: SearchFilterPrefs) {
  localStorage.setItem(SEARCH_FILTER_PREFS_CACHE_KEY, JSON.stringify(searchFilterPrefs));
}

export function _clearSearchFilterPrefs() {
  localStorage.removeItem(SEARCH_FILTER_PREFS_CACHE_KEY);
}

export function _resetSearchFilterPrefs() {
  saveSearchFilterPrefsCache({
    fromLang: getAllSupportedLangs(),
    toLang: getAllSupportedLangs(),
  });
}
