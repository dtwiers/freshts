import { brandObject, isBrandedObject } from '@freshts/utility-branded';
import {
  BOOLEAN_LITERAL,
  IDENTIFIER,
  NULL_LITERAL,
  NUMBER_LITERAL,
  REGEXP_LITERAL,
  STRING_LITERAL,
  UNDEFINED_LITERAL,
} from './ast.tags';
import {
  BooleanLiteral,
  Identifier,
  NullLiteral,
  NumberLiteral,
  RegExpLiteral,
  StringLiteral,
  Token,
  UndefinedLiteral,
} from './ast.types';

const numberBrander = brandObject(NUMBER_LITERAL);
const numberChecker = isBrandedObject(NUMBER_LITERAL);
export const makeNumberLiteral = (value: number): NumberLiteral =>
  numberBrander({ value });
export const isNumberLiteral: (value: Token) => value is NumberLiteral =
  numberChecker;

const stringBrander = brandObject(STRING_LITERAL);
const stringChecker = isBrandedObject(STRING_LITERAL);
export const makeStringLiteral = (value: string): StringLiteral =>
  stringBrander({ value });
export const isStringLiteral: (value: Token) => value is StringLiteral =
  stringChecker;

const booleanBrander = brandObject(BOOLEAN_LITERAL);
const booleanChecker = isBrandedObject(BOOLEAN_LITERAL);
export const makeBooleanLiteral = (value: boolean): BooleanLiteral =>
  booleanBrander({ value });
export const isBooleanLiteral: (value: Token) => value is BooleanLiteral =
  booleanChecker;

const nullBrander = brandObject(NULL_LITERAL);
const nullChecker = isBrandedObject(NULL_LITERAL);
export const makeNullLiteral = (): NullLiteral => nullBrander({});
export const isNullLiteral: (value: Token) => value is NullLiteral =
  nullChecker;

const undefinedBrander = brandObject(UNDEFINED_LITERAL);
const undefinedChecker = isBrandedObject(UNDEFINED_LITERAL);
export const makeUndefinedLiteral = (): UndefinedLiteral =>
  undefinedBrander({});
export const isUndefinedLiteral: (value: Token) => value is UndefinedLiteral =
  undefinedChecker;

const regexpBrander = brandObject(REGEXP_LITERAL);
const regexpChecker = isBrandedObject(REGEXP_LITERAL);
export const makeRegExpLiteral = (
  pattern: string,
  flags: string
): RegExpLiteral => regexpBrander({ pattern, flags });
export const isRegExpLiteral: (value: Token) => value is RegExpLiteral =
  regexpChecker;

const identifierBrander = brandObject(IDENTIFIER);
const identifierChecker = isBrandedObject(IDENTIFIER);
export const makeIdentifierLiteral = (name: string): Identifier =>
  identifierBrander({ name });
export const isIdentifier: (value: Token) => value is Identifier =
  identifierChecker;
