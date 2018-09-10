/* eslint-env node, jest */
import execa from 'execa';
import { join } from 'path';

const cli = join(__dirname, '..', '..', 'index.js');
const config = join(__dirname, '__fixtures__', 'config.js');

const n = n => Array(n + 1).join('-');
const format = (tag, out) => (out ? `${tag} ${n(73)}\n${out}\n ${n(80)}\n` : '');

async function run(command) {
  const args = command.replace(/^workflow /, '').match(/(?:[^\s"]+|"[^"]*")+/g);

  const { stdout, stderr } = await execa('node', [cli, ...args]);

  return format('stdout', stdout) + format('stderr', stderr);
}

describe('help', () => {
  it('should have flag: --help', async () => {
    const output = await run('workflow --help');

    expect(output).toMatchSnapshot();
  });

  it('should have a command: help', async () => {
    const output = await run('workflow help');

    expect(output).toMatchSnapshot();
  });

  it('should be available for the apply command', async () => {
    const output = await run('workflow apply --help');

    expect(output).toMatchSnapshot();
  });

  it('should provide help for explicit flows with string argument', async () => {
    const config = join(__dirname, '__fixtures__', 'config.js');
    const flow = JSON.stringify({
      type: 'workflow',
      args: 'file',
      children: [],
    });

    const output = await run(`workflow --config ${config} apply ${flow} --help`);
    expect(output).toMatchSnapshot();
  });

  it('should provide help for flows with string argument', async () => {
    const flow = JSON.stringify({
      type: 'workflow',
      args: 'file',
      children: [],
    });

    const output = await run(`workflow --config ${config} ${flow} --help`);
    expect(output).toMatchSnapshot();
  });

  it('should provide help for flows with array argument', async () => {
    const flow = JSON.stringify({
      type: 'workflow',
      args: ['cwd', 'cmd'],
      children: [],
    });

    const output = await run(`workflow --config ${config} ${flow} --help`);
    expect(output).toMatchSnapshot();
  });

  it('should provide help for flows with object argument', async () => {
    const flow = JSON.stringify({
      type: 'workflow',
      args: { cwd: 'the current working dir', cmd: 'the command to execute' },
      children: [],
    });

    const output = await run(`workflow --config ${config} ${flow} --help`);
    expect(output).toMatchSnapshot();
  });
});

it('should render a flow', async () => {
  const flow = JSON.stringify({
    type: 'workflow',
    children: [],
  });
  const output = await run(`workflow --config ${config} ${flow}`);

  expect(output).toMatchSnapshot();
});
