export function safeWordToRegularWord(safeWord: string) {
  return safeWord.replaceAll("|", "/").replaceAll("_", " ");
}

export function regularWordToSafeWord(regularWord: string) {
  return regularWord.replaceAll("/", "|").replaceAll(" ", "_");
}
