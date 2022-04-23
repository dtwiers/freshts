import { runParser, showError } from './run';
import { anyCharacter, matchString } from './constants';
import { minMaxTimes } from './many';
import { flatMapSuccess } from './flat-map';
import * as FC from 'fast-check';
import { mapFailure, mapOk, ok } from '@freshts/utility-result';
import { applyWith, pipe } from '@freshts/utility-compose';

describe('runParser', () => {
  it('outputs success or fail', () => {
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
    FC.assert(
      FC.property(FC.string({ minLength: 8 }), (inputString) => {
        const failure = pipe(
          matchString(inputString.concat('')),
          flatMapSuccess(() => anyCharacter(() => 'an extra character')),
          runParser,
          applyWith(inputString),
          mapFailure(showError)
        );
        console.log(failure.__type === 'Failure' ? failure.failure : '');
        expect(failure).toEqual('asdf');
      })
    );
  });
});
