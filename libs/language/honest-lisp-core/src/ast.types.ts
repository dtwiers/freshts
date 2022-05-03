import { BrandedObject } from '@freshts/utility-branded';

export type NumberLiteral = BrandedObject<
  {
    value: number;
  },
  'NumberLiteral'
>;

export type StringLiteral = BrandedObject<
  {
    value: string;
  },
  'StringLiteral'
>;

export type BooleanLiteral = BrandedObject<
  {
    value: boolean;
  },
  'BooleanLiteral'
>;

export type RegExpLiteral = BrandedObject<
  {
    pattern: string;
    flags: string;
  },
  'RegExpLiteral'
>;

export type ArrayLiteral = BrandedObject<
  {
    value: unknown[];
  },
  'ArrayLiteral'
>;

export type ObjectLiteral = BrandedObject<
  {
    value: Record<string, unknown>;
  },
  'ObjectLiteral'
>;

export type Identifier = BrandedObject<
  {
    name: string;
  },
  'Identifier'
>;

export type MemberExpression = BrandedObject<
  {
    property: Expression;
    object: Expression;
  },
  'MemberExpression'
>;

export type Lambda = BrandedObject<
  {
    identifier: string;
    parameterIdentifiers: string[];
    body: Expression;
  },
  'Lambda'
>;

export type Macro = BrandedObject<
  {
    identifier: string;
    parameterIdentifiers: string[];
    body: Expression;
  },
  'Macro'
>;

export type Value =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | RegExpLiteral
  | ArrayLiteral
  | ObjectLiteral
  | Identifier
  | MemberExpression
  | Lambda
  | Macro;

export type Expression = BrandedObject<
  {
    identifier: Value;
    arguments: Value[];
  },
  'Expression'
>;

export type Program = BrandedObject<
  {
    expressions: Expression[];
  },
  'Program'
>;

/*

(+ 2 2)
(+ 2 (* 1 2))

*/
