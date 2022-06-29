import { ParseErr } from '@freshts/cupid-combinator';
import { Failure, isFailure, isOk } from '@freshts/result';
import FC from 'fast-check';
import {
  booleanLiteral,
  closeParenth,
  doubleQuote,
  doubleQuotedString,
  numberLiteral,
  openParenth,
  regExpLiteral,
  singleQuote,
  singleQuotedString,
} from './base-parsers';
import assert = require('assert');

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

describe('singleQuote', () => {
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
  it('succeeds with simple string', () => {
    const parsedSuccess = doubleQuotedString(`"foo bar"`);
    expect(isOk(parsedSuccess)).toBeTruthy();
    if (isOk(parsedSuccess)) {
      expect(parsedSuccess.ok.value).toBe(`foo bar`);
    } else {
      fail(`parsedSuccess failed: ${parsedSuccess}`);
    }
  });

  it('succeeds with escaped string', () => {
    const parsedWithEscape = doubleQuotedString(`"foo\\"bar"`);
    expect(isOk(parsedWithEscape)).toBeTruthy();
    if (isOk(parsedWithEscape)) {
      expect(parsedWithEscape.ok.value).toBe(`foo"bar`);
    } else {
      fail(`parsedWithEscape failed: ${parsedWithEscape}`);
    }
  });

  it("fails when there's no opener", () => {
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

describe('singleQuotedString', () => {
  it('succeeds with simple string', () => {
    const parsedSuccess = singleQuotedString(`'foo bar'`);
    expect(isOk(parsedSuccess)).toBeTruthy();
    if (isOk(parsedSuccess)) {
      expect(parsedSuccess.ok.value).toBe(`foo bar`);
    } else {
      fail(`parsedSuccess failed: ${parsedSuccess}`);
    }
  });

  it('succeeds with escaped string', () => {
    const parsedWithEscape = singleQuotedString(`'foo\\'bar'`);
    // console.log({ parsedWithEscape });
    expect(isOk(parsedWithEscape)).toBeTruthy();
    if (isOk(parsedWithEscape)) {
      expect(parsedWithEscape.ok.value).toBe(`foo'bar`);
    } else {
      fail(`parsedWithEscape failed: ${parsedWithEscape}`);
    }
  });

  it("fails when there's no opener", () => {
    const failure = singleQuotedString("foo bar'");
    if (isFailure(failure)) {
      expect(failure.failure).toEqual<ParseErr>({
        input: "foo bar'",
        failedAtCursorStart: 0,
        failedAtCursorEnd: 1,
        expected: "'",
      });
    } else {
      fail(`single quoted string should have failed: ${failure}`);
    }
  });

  it("fails when there's no closer", () => {
    const failure = singleQuotedString("'foo bar");
    if (isFailure(failure)) {
      expect(failure.failure).toEqual<ParseErr>({
        input: "'foo bar",
        failedAtCursorStart: 8,
        failedAtCursorEnd: 8,
        expected: "'",
      });
    } else {
      fail(`single quoted string should have failed: ${failure}`);
    }
  });
});

describe('booleanLiteral', () => {
  const trueParse = booleanLiteral('true');
  const falseParse = booleanLiteral('false');
  const neitherParse = booleanLiteral('asdf');

  it('parses the correct value', () => {
    expect(trueParse.__type).toBe('Ok');
    // ts assertion
    assert(trueParse.__type === 'Ok');
    expect(trueParse.ok.value.value).toBe(true);

    expect(falseParse.__type).toBe('Ok');
    // ts assertion
    assert(falseParse.__type === 'Ok');
    expect(falseParse.ok.value.value).toBe(false);

    expect(neitherParse.__type).toBe('Failure');
    // ts assertion
    assert(neitherParse.__type === 'Failure');
    expect(neitherParse.failure.expected).toBe('true | false');
  });
});

describe('numberLiteral', () => {
  const expectIsOk = (parsedString: string, expectedNumber: number) => {
    const parsedValue = numberLiteral(parsedString);
    expect(parsedValue.__type).toBe('Ok');
    assert(parsedValue.__type === 'Ok');
    expect(parsedValue.ok.value.value).toEqual(expectedNumber);
  };

  it('parses a simple nonnegative integer', () => {
    FC.assert(
      FC.property(FC.integer({ min: 0 }), (num) => {
        expectIsOk(`${num}`, num);
      })
    );
  });

  it('parses a simple negative integer', () => {
    FC.assert(
      FC.property(FC.integer({ max: -1 }), (num) => {
        expectIsOk(`${num}`, num);
      })
    );
  });

  it('parses a simple nonnegative float', () => {
    FC.assert(
      FC.property(FC.float({ min: 0, noNaN: true }), (num) => {
        expectIsOk(num.toFixed(15), Number(num.toFixed(15)));
      })
    );
  });

  it('parses a simple negative float', () => {
    FC.assert(
      FC.property(FC.float({ max: -1, noNaN: true }), (num) => {
        expectIsOk(num.toFixed(15), Number(num.toFixed(15)));
      })
    );
  });

  it("fails on anything that isn't a number", () => {
    FC.assert(
      FC.property(FC.string(), (str) => {
        if (!isNaN(Number(str))) {
          expectIsOk(Number(str).toFixed(15), Number(Number(str).toFixed(15)));
        } else {
          expect(numberLiteral(str).__type).toBe('Failure');
        }
      })
    );
  });
});

describe('regExpLiteral', () => {
  it('matches an empty regexp literal', () => {
    const empty = regExpLiteral('//');
    expect(empty.__type).toBe('Ok');
    assert(empty.__type === 'Ok');
    expect(empty.ok.value.pattern).toBe('');
    expect(empty.ok.value.flags).toBe('');
  });

  it('fails on open regexp', () => {
    const open = regExpLiteral('/');
    expect(open.__type).toBe('Failure');
    const open2 = regExpLiteral('/asdf');
    expect(open2.__type).toBe('Failure');
  });

  it('captures the body', () => {
    const body = regExpLiteral('/asdf/');
    expect(body.__type).toBe('Ok');
    assert(body.__type === 'Ok');
    expect(body.ok.value.pattern).toBe('asdf');
    expect(body.ok.value.flags).toBe('');
  });

  it('captures the flags', () => {
    const body = regExpLiteral('//gmiyusd');
    expect(body.__type).toBe('Ok');
    assert(body.__type === 'Ok');
    expect(body.ok.value.pattern).toBe('');
    expect(body.ok.value.flags).toBe('gmiyusd');
  });

  it('escapes slashes', () => {
    const escapes = regExpLiteral('/\\//gm');
    expect(escapes.__type).toBe('Ok');
    assert(escapes.__type === 'Ok');
    expect(escapes.ok.value.pattern).toBe('\\/');
    expect(escapes.ok.value.flags).toBe('gm');
  });
});
