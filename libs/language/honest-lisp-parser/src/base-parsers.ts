import {
  between,
  mapErr,
  mapSuccess,
  matchRegex,
  matchString,
  minMaxTimes,
  oneOf,
  orElse,
} from '@freshts/cupid-combinator';
import { pipe } from '@freshts/utility-compose';
import {
  makeBooleanLiteral,
  makeNullLiteral,
  makeNumberLiteral,
  makeRegExpLiteral,
  makeStringLiteral,
  makeUndefinedLiteral,
} from '@honest-lisp/core';
import { escapeCharParser } from './string.util';

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
  escapeCharParser('"'),
  minMaxTimes(0),
  mapSuccess((str) => str.join('')),
  between(doubleQuote, doubleQuote)
);
export const singleQuotedString = pipe(
  escapeCharParser("'"),
  minMaxTimes(0),
  mapSuccess((str) => str.join('')),
  between(singleQuote, singleQuote)
);

// LITERALS

export const stringLiteral = pipe(
  doubleQuotedString,
  orElse(() => singleQuotedString),
  mapSuccess(makeStringLiteral)
);

const numberRegex = /^-?[0-9]+(?:\.[0-9]+)?$/;

export const numberLiteral = pipe(
  matchRegex(numberRegex, 'number'),
  mapSuccess((match) => Number(match[0])),
  mapSuccess(makeNumberLiteral)
);

export const booleanLiteral = pipe(
  oneOf('true', 'false'),
  mapSuccess((input) => input === 'true'),
  mapSuccess(makeBooleanLiteral),
  mapErr((err) => ({ ...err, expected: 'true | false' }))
);

export const nullLiteral = pipe(
  matchString('null'),
  mapSuccess(makeNullLiteral)
);

export const undefinedLiteral = pipe(
  matchString('undefined'),
  mapSuccess(makeUndefinedLiteral)
);

// don't use escapeCharParser because it needs to keep the '\\/' escaping...I think
export const regExpLiteral = pipe(
  matchRegex(/\/(?<body>.*)\/(?<flags>[gmiyusd]*)/, 'Regexp Literal'),
  mapSuccess((match) =>
    makeRegExpLiteral(
      match.groups?.['body'] ?? '',
      match.groups?.['flags'] ?? ''
    )
  )
);
