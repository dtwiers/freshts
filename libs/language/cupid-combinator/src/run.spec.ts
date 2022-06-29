import { applyWith, pipe } from '@freshts/compose';
import { fail, mapFailure, ok } from '@freshts/result';
import * as FC from 'fast-check';
import { matchString } from './constants';
import { flatMapSuccess } from './flat-map';
import { formatCodeFrame, formatLineNumber, runParser, showError } from './run';

describe('runParser', () => {
  it('outputs success or fail', () => {
    FC.assert(
      FC.property(FC.string(), FC.string(), (inputString, match) => {
        if (inputString.startsWith(match)) {
          expect(runParser(matchString(match))(inputString)).toEqual(ok(match));
        } else {
          expect(runParser(matchString(match))(inputString).__type).toBe(
            'Failure'
          );
        }
      })
    );
  });
});

describe('showError', () => {
  it('shows the error in the right place', () => {
    const failure = pipe(
      matchString('foo'),
      flatMapSuccess(() => matchString('bar')),
      runParser,
      applyWith('foobaz'),
      mapFailure(showError())
    );
    expect(failure).toEqual(
      fail([' 1 | foobaz', '   |    ^^^ expected: bar'].join('\n'))
    );
  });
});

describe('formatCodeFrame', () => {
  it('formats 3 lines', () => {
    const result = formatCodeFrame({
      input: 'asd1\nasd2\nasd3',
      message: 'fdsa',
      errorStart: 6,
      errorEnd: 8,
    });
    expect(result).toBe(
      [' 1 | asd1', ' 2 | asd2', '   |  ^^ fdsa', ' 3 | asd3'].join('\n')
    );
  });
});

describe('formatLineNumber', () => {
  it('adds a line number', () => {
    expect(formatLineNumber(3)(3)).toBe('   3 | ');
  });

  it('adds a space', () => {
    expect(formatLineNumber(3)()).toBe('     | ');
  });
});
