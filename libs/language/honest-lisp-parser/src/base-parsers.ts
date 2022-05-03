import {
  between,
  flatMapSuccess,
  mapSuccess,
  matchRegex,
  matchString,
  notMatchChar,
  oneOf,
  orElse,
} from '@freshts/cupid-combinator';
import { pipe } from '@freshts/utility-compose';
import {
  makeBooleanLiteral,
  makeNullLiteral,
  makeNumberLiteral,
  makeStringLiteral,
  makeUndefinedLiteral,
} from '@honest-lisp/core';
import { unescapeChar } from './string.util';

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

// LITERALS

export const stringLiteral = pipe(
  pipe(doubleQuotedString, mapSuccess(unescapeChar('"'))),
  orElse(() => pipe(singleQuotedString, mapSuccess(unescapeChar("'")))),
  mapSuccess(makeStringLiteral)
);

const numberRegex = /-?[0-9]+(?:\.[0-9]+)?/;

export const numberLiteral = pipe(
  matchRegex(numberRegex, 'number'),
  mapSuccess(Number),
  mapSuccess(makeNumberLiteral)
);

export const booleanLiteral = pipe(
  oneOf('true', 'false'),
  mapSuccess((input) => input === 'true'),
  mapSuccess(makeBooleanLiteral)
);

export const nullLiteral = pipe(
  matchString('null'),
  mapSuccess(makeNullLiteral)
);

export const undefinedLiteral = pipe(
  matchString('undefined'),
  mapSuccess(makeUndefinedLiteral)
);

export const regexpLiteral = pipe(
  matchString('\\/'),
  orElse(() => notMatchChar('/')),
  between(matchString('/'), matchString('/'))
  // todo: work with flags
);
