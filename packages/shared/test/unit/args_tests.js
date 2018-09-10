/* eslint-env jest */
import args from '../../args';

describe('args(args)', () => {
  it('should parse single character arguments correctly', () => {
    const input = ['node', 'cli.js', '-c', 'config', '-f', 'filename', 'otherargs'];
    const expectedOutput = {
      named: { c: 'config', f: 'filename' },
      positional: ['otherargs'],
    };
    expect(args(input)).toEqual(expectedOutput);
  });

  it('should parse word arguments correctly', () => {
    const input = ['node', 'cli.js', '--config', 'config', '--filename', 'filename', 'otherargs'];
    const expectedOutput = {
      named: { config: 'config', filename: 'filename' },
      positional: ['otherargs'],
    };
    expect(args(input)).toEqual(expectedOutput);
  });

  it('should intepret a trailing option as a boolean flag', () => {
    const { c } = args(['node', 'cli.js', '-c']).named;
    expect(c).toBe(true);
  });
});

describe('argument name', () => {
  it('should extract the argument name for single character arg', () => {
    const { c } = args(['node', 'cli.js', '-c', 'config.js']).named;

    expect(c).toBe('config.js');
  });

  it('should extract the argument name for single word arg', () => {
    const { config } = args(['node', 'cli.js', '--config', 'config.js']).named;
    expect(config).toBe('config.js');
  });

  it('should extract the argument name for multi word arg', () => {
    const namedArguments = args(['node', 'cli.js', '--some-long-name', 'some-long-value']).named;
    expect(namedArguments['some-long-name']).toBe('some-long-value');
  });

  it('should throw an error if - is succeded by a word', () => {
    expect(() => args(['node', 'cli.js', '-config'])).toThrowErrorMatchingSnapshot();
  });

  it('should throw an error if -- is succeded by a single character', () => {
    expect(() => args(['node', 'cli.js', '--c'])).toThrowErrorMatchingSnapshot();
  });
});
