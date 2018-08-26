/* eslint-env jest */
import { args, getArgName, removeScriptName } from '../../args';

describe('args(args)', () => {
  it('should parse single character arguments correctly', () => {
    const input = ['hello', 'world', '-c', 'config', '-f', 'filename', 'otherargs'];
    const expectedOutput = {
      named: { c: 'config', f:'filename' },
      positional: ['hello', 'world', 'otherargs'],
    };
    expect(args(input)).toEqual(expectedOutput);
  });

  it('should parse word arguments correctly', () => {
    const input = [
      'hello',
      'world',
      '--config',
      'config',
      '--filename',
      'filename',
      'otherargs',
    ];
    const expectedOutput = {
      named: { config: 'config', filename: 'filename' },
      positional: ['hello', 'world', 'otherargs'],
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
