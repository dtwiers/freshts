import { mapSuccess, matchString, notMatchChar, orElse } from "@freshts/cupid-combinator";
import { pipe } from "@freshts/compose";

export const escapeCharParser = (char: string, escapeChar = '\\') => pipe(
  matchString(`${escapeChar}${char}`),
  mapSuccess(() => char),
  orElse(() => notMatchChar(char))
)