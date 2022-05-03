export const unescapeChar = (char: string) => (input: string) =>
  input.replace(`\\${char}`, char);
