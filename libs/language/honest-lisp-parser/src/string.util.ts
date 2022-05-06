import { mapSuccess, matchString, notMatchChar, orElse } from "@freshts/cupid-combinator";
import { pipe } from "@freshts/utility-compose";

export const escapeCharParser = (char: string, escapeChar = '\\') => pipe(
  matchString(`${escapeChar}${char}`),
  mapSuccess(() => escapeChar),
  orElse(() => notMatchChar(escapeChar))
)