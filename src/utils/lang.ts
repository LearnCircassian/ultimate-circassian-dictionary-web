export function containsOnlyEnglishLetters(input: string): boolean {
  // Regular expression to match only English letters (uppercase and lowercase)
  const regex = /^[A-Za-z]+$/;

  // Test the input string against the regex
  return regex.test(input);
}
