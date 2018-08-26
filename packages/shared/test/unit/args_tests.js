/* eslint-env jest */
import { args, getArgName } from '../../args';

describe('args(args)', () => {
  it('should parse the arguments correctly', () => {
    const input = [
      'hello',
      'world',
      '-c',
      'config',
      '--filename',
      'filename',
      'otherargs',
      'remaining',
    ];
    const expectedOutput = {
      named: { c: 'config', filename: 'filename' },
      positional: ['hello', 'world', 'otherargs', 'remaining'],
    };
    expect(args(input)).toEqual(expectedOutput);
  });

  it('should throw an error if value is not passed for arg', () => {
    const input = ['hello', 'world', '-c'];
    expect(() => args(input)).toThrowError();
  });
});

describe('getArgName(arg)', () => {
  it('should extract the argument name for single character arg', () => {
    expect(getArgName('-c')).toBe('c');
  });

  it('should extract the argument name for word arg', () => {
    expect(getArgName('--config')).toBe('config');
  });
});
