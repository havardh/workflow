// @flow
/* eslint-env mocha */
import { it, describe } from 'mocha';
import { expect } from 'chai';

import { getTestFile } from '../../helpers/advisor';

describe('getTestFile(file)', () => {
  it('should transform source file to test file', () => {
    const sourceFile = 'advisor/src/component/title.js';
    const testFile = 'advisor/test/component/title_tests.js';

    const file = getTestFile(sourceFile);

    expect(file).to.equal(testFile);
  });
});
