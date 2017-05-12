# workflow

Workflow is a prototype for a workspace manager. Workflow aims to simplify navigating
complex window configurations. It does so by letting the user define layouts and
a way to easily navigate between them. Workflow is meant to be an abstraction
layer on top of window managers like i3, awesome, and the proprietary ones found in
OSX and Windows.

## Are we crOSs yet?

| OS/wm        | Status              |
|--------------|---------------------|
| i3           | Complete            |
| windows      | [For Review](https://github.com/havardh/workflow/pull/11)   |
| OSX          | [In Progress](https://github.com/havardh/workflow/issues/3)   |
| awesome      | [Up for grabs](https://github.com/havardh/workflow/issues/8)  |
| Ubuntu/Unity | [Up for grabs](https://github.com/havardh/workflow/issues/13) |


## Example

Lets say you are writing code in a TTD fashion and want to see both code, tests and
test execution at the same time:

```
|-Atom-[add.js]------|-Atom-[add_test.js]-|
| add(a, b) {        | test_add_one() {   |
|  return a+b;       |   n = add(1, 1);   |
| }                  |   assert(n == 2);  |
|                    |                    |
|                    |                    |
|--XTerm----------------------------------|
| > 1 tests passed                        |
|                                         |
|                                         |
|-----------------------------------------|
```

Now your layout consist of two instances of Atom one with code and one
with tests, and a terminal running the tests. To achieve this in workflow
we would add a layout file for this purpose:

```js
const workspace : WorkspaceConfig = {
  name: 'advisor:unit-test',
  args: 'file',
  root: SplitV({
    percent: 1.0,
    children: [
      SplitH({
        percent: 0.8,
        children: [
          Atom({
            percent: 0.5,
            folder: ({ file }) => projectRoot(file),
            file: ({ file }) => file,
            open: ({ file }) => `atom -n ${file}`,
          }),
          Atom({
            percent: 0.5,
            folder: ({ file }) => projectRoot(file),
            file: ({ file }) => getTestFile(file),
            open: ({ file }) => `atom -n ${file}`,
          }),
        ],
      }),
      XTerm({
        percent: 0.2,
        cwd: ({ file }) => projectRoot(file),
        cmd: 'npm run watch:test:base --',
        args: [
          ({ file }) => getTestFile(file),
        ],
        open: ({ cwd, cmd, args }) => `cd ${cwd} && xterm -T '${cmd} ${args.join(' ')}' -e '${cmd} ${args.join(' ')}'`,
      }),
    ],
  }),
};
```

The layout file contains a lot of detail, but the main points are the three `app`
blocks containing the definition for how to open the three various programs.
Each `app` block has a _name_ and some _arguments_. The `Atom` program,
being an text editor, takes a file and a base folder to open. The `XTerm` terminal
accepts a _command_, a _directory_ to execute the command from and a list of _arguments_
to the command.

To start this layout run the `yarn start` command with the layout and the source file as an
argument.

```
yarn start -- jsTest add.js
```

The full example can be found [here](examles/js-test.js):

## Usage

```
yarn
yarn start -- <options>
```

### Development

```shell
yarn run test  # Run tests
yarn run flow  # Run type checker
yarn run eslint . # Run lint
```
