import {
  between,
  mapErr,
  mapSuccess,
  matchRegex,
  matchString,
  minMaxTimes,
  oneOf,
  orElse,
  Parser,
} from '@freshts/cupid-combinator';
import { pipe } from '@freshts/utility-compose';
import {
  Identifier,
  makeBooleanLiteral,
  makeIdentifierLiteral,
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

const regExpLiteralRegExp = /\/(?<body>.*)\/(?<flags>[gmiyusd]*)/;
// don't use escapeCharParser because it needs to keep the '\\/' escaping...I think
export const regExpLiteral = pipe(
  matchRegex(regExpLiteralRegExp, 'Regexp Literal'),
  mapSuccess((match) =>
    makeRegExpLiteral(
      match.groups?.['body'] ?? '',
      match.groups?.['flags'] ?? ''
    )
  )
);

const identifierRegExp = /^[a-zA-Z$_][a-zA-Z$_0-9]*$/;

export const identifierLiteral: Parser<Identifier> = pipe(
  matchRegex(identifierRegExp, 'identifier'),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  mapSuccess((match) => makeIdentifierLiteral(match[0] ?? ''))
);
