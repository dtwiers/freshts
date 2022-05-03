import {
  matchString,
  between,
  notMatchChar,
  orElse,
} from '@freshts/cupid-combinator';
import { pipe } from '@freshts/utility-compose';

// DELIMITERS

export const openParenth = matchString('(');
export const closeParenth = matchString(')');

export const doubleQuote = matchString('"');
export const singleQuote = matchString("'");

export const openSquare = matchString('[');
export const closeSquare = matchString(']');

export const openCurly = matchString('{');
export const closeCurly = matchString('}');

// DELIMITED
export const doubleQuotedString = pipe(
  matchString('\\"'),
  orElse(() => notMatchChar('"')),
  between(doubleQuote, doubleQuote)
);
export const singleQuotedString = pipe(
  matchString("\\'"),
  orElse(() => notMatchChar("'")),
  between(singleQuote, singleQuote)
);
export const stringLiteral = pipe(
  doubleQuotedString,
  orElse(() => singleQuotedString)
);
