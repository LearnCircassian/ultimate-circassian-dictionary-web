// Function to load state from localStorage
import { WordResult } from "~/interfaces";
import { WORD_HISTORY_CACHE_KEY } from "~/constants/cache";

export function _loadWordHistoryCache(): WordResult[][] {
  try {
    const serializedState = localStorage.getItem(WORD_HISTORY_CACHE_KEY);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
}

// Function to save state to localStorage
function _saveWordHistoryCache(state: WordResult[][]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(WORD_HISTORY_CACHE_KEY, serializedState);
  } catch (err) {
    // Handle write errors here
  }
}

export function findInWordHistoryCache(word: string): WordResult[] | undefined {
  const last300UsedWords = _loadWordHistoryCache();
  return last300UsedWords.find((wordResults) => {
    if (wordResults.length === 0) {
      return false;
    }
    const wordRes = wordResults[0];
    return wordRes.spelling.toLowerCase() === word.toLowerCase();
  });
}

export function findSeveralInWordHistoryCache(words: string[]): WordResult[] | undefined {
  const last300UsedWords = _loadWordHistoryCache();
  const listToReturn: WordResult[] = [];

  for (const wordResults of last300UsedWords) {
    if (wordResults.length === 0) {
      continue;
    }
    const wordRes = wordResults[0];
    if (words.includes(wordRes.spelling.toLowerCase())) {
      listToReturn.push(wordRes);
    }
  }

  return listToReturn;
}

export function findAutocompletesInWordHistoryCache(word: string): string[] {
  const last300UsedWords = _loadWordHistoryCache();
  const listToReturn: string[] = [];

  for (const wordResults of last300UsedWords) {
    if (wordResults.length === 0) {
      continue;
    }
    const wordRes = wordResults[0];
    if (wordRes.spelling.toLowerCase().startsWith(word.toLowerCase())) {
      listToReturn.push(wordRes.spelling);
    }
  }

  return listToReturn;
}

export function findAllAutocompletesInWordHistoryCache(): string[] {
  const last300UsedWords = _loadWordHistoryCache();
  const listToReturn: string[] = [];

  for (const wordResults of last300UsedWords) {
    if (wordResults.length === 0) {
      continue;
    }
    const wordRes = wordResults[0];
    listToReturn.push(wordRes.spelling);
  }

  return listToReturn;
}

export function addToWordHistoryCache(word: WordResult[]) {
  const last300UsedWords = _loadWordHistoryCache();

  // Check if word already exists in history
  const existingIndex = last300UsedWords.findIndex((wordResults) => {
    if (wordResults.length === 0) {
      return false; // remove empty arrays
    }
    const wordRes = wordResults[0];
    return wordRes.spelling === word[0].spelling;
  });

  // If word does not exist, add it to the beginning of the array
  if (existingIndex === -1) {
    last300UsedWords.unshift(word);
    _saveWordHistoryCache(last300UsedWords);
  }
}

export function removeFromWordHistoryCache(word: string) {
  const last300UsedWords = _loadWordHistoryCache();

  // Filter out the word to remove
  const newLast300UsedWords = last300UsedWords.filter((wordResults) => {
    if (wordResults.length === 0) {
      return false;
    }
    const wordRes = wordResults[0];
    return wordRes.spelling !== word;
  });

  // Save the updated history
  _saveWordHistoryCache(newLast300UsedWords);
}
