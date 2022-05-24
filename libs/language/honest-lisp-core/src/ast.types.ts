import { BrandedObject, EmptyBrandedObject } from '@freshts/utility-branded';
import * as Tags from './ast.tags';

export type NumberLiteral = BrandedObject<
  {
    value: number;
  },
  typeof Tags.NUMBER_LITERAL
>;

export type StringLiteral = BrandedObject<
  {
    value: string;
  },
  typeof Tags.STRING_LITERAL
>;

export type BooleanLiteral = BrandedObject<
  {
    value: boolean;
  },
  typeof Tags.BOOLEAN_LITERAL
>;

export type RegExpLiteral = BrandedObject<
  {
    pattern: string;
    flags: string;
  },
  typeof Tags.REGEXP_LITERAL
>;

export type ArrayLiteral = BrandedObject<
  {
    value: unknown[];
  },
  typeof Tags.ARRAY_LITERAL
>;

export type ObjectLiteral = BrandedObject<
  {
    value: Record<string, unknown>;
  },
  typeof Tags.OBJECT_LITERAL
>;

export type NullLiteral = EmptyBrandedObject<typeof Tags.NULL_LITERAL>;
export type UndefinedLiteral = EmptyBrandedObject<
  typeof Tags.UNDEFINED_LITERAL
>;

export type Identifier = BrandedObject<
  {
    name: string;
  },
  typeof Tags.IDENTIFIER
>;

export type MemberExpression = BrandedObject<
  {
    property: IndexType;
    object: Indexable;
  },
  typeof Tags.MEMBER_EXPRESSION
>;

export type LambdaDefinition = BrandedObject<
  {
    identifier: Expression;
    parameterIdentifiers: string[];
    body: Expression;
  },
  typeof Tags.LAMBDA_DEFINITION
>;

export type MacroDefinition = BrandedObject<
  {
    identifier: string;
    parameterIdentifiers: string[];
    body: Expression;
  },
  typeof Tags.MACRO_DEFINITION
>;

export type Value =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | RegExpLiteral
  | ArrayLiteral
  | ObjectLiteral
  | NullLiteral
  | UndefinedLiteral
  | Identifier
  | MemberExpression
  | LambdaDefinition
  | MacroDefinition
  | Expression;

export type IndexType =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | Identifier
  | MemberExpression
  | Expression;

export type Indexable =
  | Identifier
  | MemberExpression
  | Expression;

export type Expression = BrandedObject<
  {
    identifier: Value;
    arguments: Value[];
  },
  typeof Tags.EXPRESSION
>;

export type Program = BrandedObject<
  {
    expressions: Expression[];
  },
  typeof Tags.PROGRAM
>;

export type Token = Value | Program;

export const foo: Program = {
  __type: 'Program',
  expressions: [
    {
      __type: 'Expression',
      identifier: {
        __type: 'MemberExpression',
        property: {
          __type: 'Expression',
          identifier: {
            __type: 'StringLiteral',
            value: 'foo',
          },
          arguments: [],
        },
        object: {
          __type: 'Expression',
          identifier: {
            __type: 'Identifier',
            name: '$this',
          },
          arguments: [],
        },
      },
      arguments: [],
    },
  ],
};
