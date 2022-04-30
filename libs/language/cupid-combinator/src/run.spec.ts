import { applyWith, pipe } from '@freshts/utility-compose';
import { mapFailure, ok } from '@freshts/utility-result';
import * as FC from 'fast-check';
import { anyCharacter, matchString } from './constants';
import { flatMapSuccess } from './flat-map';
import { formatCodeFrame, runParser, showError } from './run';

describe('runParser', () => {
  xit('outputs success or fail', () => {
    FC.assert(
      FC.property(FC.string(), FC.string(), (inputString, match) => {
        if (inputString === match) {
          expect(runParser(matchString(match))(inputString)).toEqual(
            ok(inputString)
          );
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
      runParser,
      applyWith('bar'),
      mapFailure(showError())
    );
    expect(failure).toBe('asdf');
    // FC.assert(
    //   FC.property(FC.string({ minLength: 8 }), (inputString) => {
    //     const failure = pipe(
    //       matchString(inputString.concat('')),
    //       flatMapSuccess(() => anyCharacter(() => 'an extra character')),
    //       runParser,
    //       applyWith(inputString),
    //       mapFailure(showError())
    //     );
    //     console.log(failure.__type === 'Failure' ? failure.failure : '');
    //     expect(failure).toEqual('asdf');
    //   })
    // );
  });
});

describe('formatCodeFrame', () => {
  const result = formatCodeFrame({
    input: 'asdf\nasdf\nasdf',
    message: 'fdsa',
    errorStart: 6,
    errorEnd: 8,
  });
  expect(result).toBe('asdf');
});
