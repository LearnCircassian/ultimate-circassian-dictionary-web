import { getAllSupportedLangs, SupportedLang } from "~/interfaces";
import { CACHE_VERSION, SEARCH_FILTER_PREFS_CACHE_KEY } from "~/constants/cache";

interface SearchFilterPrefsCache {
  fromLang: SupportedLang[];
  toLang: SupportedLang[];
  version: string;
}

const DEFAULT_SEARCH_FILTER_PREFS: SearchFilterPrefsCache = {
  fromLang: getAllSupportedLangs(),
  toLang: getAllSupportedLangs(),
  version: CACHE_VERSION,
};

export function getSearchFilterPrefsCache(): SearchFilterPrefsCache {
  try {
    if (typeof window === "undefined") {
      return DEFAULT_SEARCH_FILTER_PREFS;
    }
    const prefs = localStorage.getItem(SEARCH_FILTER_PREFS_CACHE_KEY);
    if (!prefs) {
      saveSearchFilterPrefsCache(DEFAULT_SEARCH_FILTER_PREFS);
      return DEFAULT_SEARCH_FILTER_PREFS;
    }
    const parsed: SearchFilterPrefsCache = JSON.parse(prefs);
    if (parsed.version !== CACHE_VERSION) {
      _resetSearchFilterPrefs();
      return DEFAULT_SEARCH_FILTER_PREFS;
    }
    return parsed;
  } catch (err) {
    _clearSearchFilterPrefsCache();
    return DEFAULT_SEARCH_FILTER_PREFS;
  }
}

export function saveSearchFilterPrefsCache(searchFilterPrefs: SearchFilterPrefsCache) {
  localStorage.setItem(SEARCH_FILTER_PREFS_CACHE_KEY, JSON.stringify(searchFilterPrefs));
}

export function _clearSearchFilterPrefsCache() {
  localStorage.removeItem(SEARCH_FILTER_PREFS_CACHE_KEY);
}

export function _resetSearchFilterPrefs() {
  _clearSearchFilterPrefsCache();
  saveSearchFilterPrefsCache(DEFAULT_SEARCH_FILTER_PREFS);
}
