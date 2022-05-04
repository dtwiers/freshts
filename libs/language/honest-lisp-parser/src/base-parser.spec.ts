import { ParseErr } from '@freshts/cupid-combinator';
import { Failure, isFailure, isOk } from '@freshts/utility-result';
import {
  closeParenth,
  doubleQuote,
  doubleQuotedString,
  openParenth,
  singleQuote,
} from './base-parsers';

describe('openParenth', () => {
  it('parses an open parenth', () => {
    const success = openParenth('(', 0);
    if (isOk(success)) {
      expect(success.ok.value).toBe('(');
      expect(success.ok.inputCursor).toBe(0);
      expect(success.ok.outputCursor).toBe(1);
      expect(success.ok.input).toBe('(');
    } else {
      fail(`parsing failed: ${success}`);
    }
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

describe('closeParenth', () => {
  it('parses a closed parenth', () => {
    const success = closeParenth(')', 0);
    if (isOk(success)) {
      expect(success.ok.value).toBe(')');
      expect(success.ok.inputCursor).toBe(0);
      expect(success.ok.outputCursor).toBe(1);
      expect(success.ok.input).toBe(')');
    } else {
      fail(`parsing failed: ${success}`);
    }
  });

  it('fails any other time', () => {
    const fail = closeParenth('(', 0);
    expect(fail.__type).toBe('Failure');
    expect((fail as Failure<ParseErr>).failure.expected).toBe(')');
    expect((fail as Failure<ParseErr>).failure.input).toBe('(');
    expect((fail as Failure<ParseErr>).failure.failedAtCursorStart).toBe(0);
    expect((fail as Failure<ParseErr>).failure.failedAtCursorEnd).toBe(1);
  });
});

describe('doubleQuote', () => {
  it('parses a double quote', () => {
    const success = doubleQuote('"', 0);
    if (isOk(success)) {
      expect(success.ok.value).toBe('"');
      expect(success.ok.inputCursor).toBe(0);
      expect(success.ok.outputCursor).toBe(1);
      expect(success.ok.input).toBe('"');
    } else {
      fail(`parsing failed: ${success}`);
    }
  });

  it('fails any other time', () => {
    const fail = doubleQuote('(', 0);
    expect(fail.__type).toBe('Failure');
    expect((fail as Failure<ParseErr>).failure.expected).toBe('"');
    expect((fail as Failure<ParseErr>).failure.input).toBe('(');
    expect((fail as Failure<ParseErr>).failure.failedAtCursorStart).toBe(0);
    expect((fail as Failure<ParseErr>).failure.failedAtCursorEnd).toBe(1);
  });
});

xdescribe('singleQuote', () => {
  it('parses a single quote', () => {
    const success = singleQuote("'", 0);
    if (isOk(success)) {
      expect(success.ok.value).toBe("'");
      expect(success.ok.inputCursor).toBe(0);
      expect(success.ok.outputCursor).toBe(1);
      expect(success.ok.input).toBe("'");
    } else {
      fail(`parsing failed: ${success}`);
    }
  });

  it('fails any other time', () => {
    const fail = singleQuote('(', 0);
    expect(fail.__type).toBe('Failure');
    expect((fail as Failure<ParseErr>).failure.expected).toBe("'");
    expect((fail as Failure<ParseErr>).failure.input).toBe('(');
    expect((fail as Failure<ParseErr>).failure.failedAtCursorStart).toBe(0);
    expect((fail as Failure<ParseErr>).failure.failedAtCursorEnd).toBe(1);
  });
});

describe('doubleQuotedString', () => {
  xit('succeeds with simple string', () => {
    const parsedSuccess = doubleQuotedString(`"foo bar"`);
    expect(isOk(parsedSuccess)).toBeTruthy();
    if (isOk(parsedSuccess)) {
      expect(parsedSuccess.ok.value).toBe(`foo bar`);
    } else {
      fail(`parsedSuccess failed: ${parsedSuccess}`);
    }
  });

  xit('succeeds with escaped string', () => {
    const parsedWithEscape = doubleQuotedString(`"foo\\"bar"`);
    expect(isOk(parsedWithEscape)).toBeTruthy();
    if (isOk(parsedWithEscape)) {
      expect(parsedWithEscape.ok.value).toBe(`foo"bar`);
    } else {
      fail(`parsedWithEscape failed: ${parsedWithEscape}`);
    }
  });

  xit("fails when there's no opener", () => {
    const failure = doubleQuotedString('foo bar"');
    if (isFailure(failure)) {
      expect(failure.failure).toEqual<ParseErr>({
        input: 'foo bar"',
        failedAtCursorStart: 0,
        failedAtCursorEnd: 1,
        expected: '"',
      });
    } else {
      fail(`double quoted string should have failed: ${failure}`);
    }
  });

  it("fails when there's no closer", () => {
    const failure = doubleQuotedString('"foo bar');
    if (isFailure(failure)) {
      expect(failure.failure).toEqual<ParseErr>({
        input: '"foo bar',
        failedAtCursorStart: 8,
        failedAtCursorEnd: 8,
        expected: '"',
      });
    } else {
      fail(`double quoted string should have failed: ${failure}`);
    }
  });
});
