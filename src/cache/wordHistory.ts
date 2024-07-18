// Function to load state from localStorage
import { WordDefinitionsResults } from "~/interfaces";
import { WORD_HISTORY_CACHE_KEY } from "~/constants/cache";

const MAX_WORD_HISTORY_CACHE = 100;

export function _loadWordHistoryCache(): WordDefinitionsResults[][] {
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
function _saveWordHistoryCache(state: WordDefinitionsResults[][]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(WORD_HISTORY_CACHE_KEY, serializedState);
  } catch (err) {
    // Handle write errors here
  }
}

export function findInWordHistoryCache(word: string): WordDefinitionsResults[] | undefined {
  const lastUsedWords = _loadWordHistoryCache();
  return lastUsedWords.find((wordResults) => {
    if (wordResults.length === 0) {
      return false;
    }
    const wordRes = wordResults[0];
    return wordRes.spelling.toLowerCase() === word.toLowerCase();
  });
}

export function findSeveralInWordHistoryCache(
  words: string[],
): WordDefinitionsResults[] | undefined {
  const lastUsedWords = _loadWordHistoryCache();
  const listToReturn: WordDefinitionsResults[] = [];

  for (const wordResults of lastUsedWords) {
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
  const lastUsedWords = _loadWordHistoryCache();
  const listToReturn: string[] = [];

  for (const wordResults of lastUsedWords) {
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
  const lastUsedWords = _loadWordHistoryCache();
  const listToReturn: string[] = [];

  for (const wordResults of lastUsedWords) {
    if (wordResults.length === 0) {
      continue;
    }
    const wordRes = wordResults[0];
    listToReturn.push(wordRes.spelling);
  }

  return listToReturn;
}

export function addToWordHistoryCache(word: WordDefinitionsResults[]) {
  if (word.length === 0) {
    return;
  }

  const lastUsedWords = _loadWordHistoryCache();

  // Check if word already exists in history
  const existingIndex = lastUsedWords.findIndex((wordResults) => {
    if (wordResults.length === 0) {
      return false; // remove empty arrays
    }
    const wordRes = wordResults[0];
    return wordRes.spelling === word[0].spelling;
  });

  // If word does not exist, add it to the beginning of the array
  if (existingIndex === -1) {
    lastUsedWords.unshift(word); // Add to the beginning of the array

    // Ensure the cache does not exceed 100 instances
    if (lastUsedWords.length > MAX_WORD_HISTORY_CACHE) {
      lastUsedWords.pop(); // Remove the oldest word
    }

    _saveWordHistoryCache(lastUsedWords);
  }
}

export function removeFromWordHistoryCache(word: string) {
  const lastUsedWords = _loadWordHistoryCache();

  // Filter out the word to remove
  const newLastUsedWords = lastUsedWords.filter((wordResults) => {
    if (wordResults.length === 0) {
      return false;
    }
    const wordRes = wordResults[0];
    return wordRes.spelling !== word;
  });

  // Save the updated history
  _saveWordHistoryCache(newLastUsedWords);
}

export function findLeftAndRightOfCachedWord(word: string): { left: string; right: string } {
  const lastUsedWords = _loadWordHistoryCache();
  const wordIndex = lastUsedWords.findIndex((wordResults) => {
    if (wordResults.length === 0) {
      return false;
    }
    const wordRes = wordResults[0];
    return wordRes.spelling.toLowerCase() === word.toLowerCase();
  });

  // in case the word is not found, we assume this is a new word, therefore the left will be the last value
  if (wordIndex === -1) {
    return {
      left: lastUsedWords[lastUsedWords.length - 1]?.[0]?.spelling ?? "",
      right: "",
    };
  }

  const leftWord = lastUsedWords[wordIndex - 1]?.[0]?.spelling ?? "";
  const rightWord = lastUsedWords[wordIndex + 1]?.[0]?.spelling ?? "";

  return { left: leftWord, right: rightWord };
}
