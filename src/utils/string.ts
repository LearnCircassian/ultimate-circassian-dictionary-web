export function allCharactersAreNumbers(str: string): boolean {
  return str.split("").every((char) => !isNaN(parseInt(char)));
}

export function countSubstringLoop(str: string, subStr: string): number {
  let count = 0;
  let pos = str.indexOf(subStr);

  while (pos !== -1) {
    count++;
    pos = str.indexOf(subStr, pos + 1);
  }

  return count;
}
