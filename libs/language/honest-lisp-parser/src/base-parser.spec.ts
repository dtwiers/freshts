import { ParseErr, ParseOk } from '@freshts/cupid-combinator';
import { Failure, Ok } from '@freshts/utility-result';
import { openParenth } from './base-parsers';

describe('openParenth', () => {
  it('parses an open parenth', () => {
    const success = openParenth('(', 0);
    expect(success.__type).toBe('Ok');
    expect((success as Ok<ParseOk<string>>).ok.value).toBe('(');
  });

  it('fails any other time', () => {
    const fail = openParenth(')', 0);
    expect(fail.__type).toBe('Failure');
    expect((fail as Failure<ParseErr>).failure.expected).toBe('(');
    expect((fail as Failure<ParseErr>).failure.input).toBe(')');
    expect((fail as Failure<ParseErr>).failure.failedAtCursorStart).toBe(0);
    expect((fail as Failure<ParseErr>).failure.failedAtCursorEnd).toBe(1);
  });
});
