export function extractTwitterId(url: string): string | null {
  // Regular expression to match Twitter status URL
  const regex = /\/status\/(\d+)/;

  // Check if the URL matches the pattern
  const match = url.match(regex);

  // If match is found, return the ID (group 1 in the regex match)
  if (match && match[1]) {
    return match[1];
  } else {
    // Return null if no match is found
    return null;
  }
}
