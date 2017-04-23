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

```yaml
workspace:
  args:
    - file
  name: advisor:unit-testing
  root:
    container:
      layout: splitv
      percent: 1.0
      children:
        - container:
            layout: splith
            percent: 0.8
            children:
              - app:
                  percent: 0.5
                  name: Atom
                  folder: $project_root(file)
                  file: $file
              - app:
                  percent: 0.5
                  name: Atom
                  folder: $project_root(file)
                  file: $get_test_file(file)
        - app:
            percent: 0.2
            name: XTerm
            cwd: $project_root(file)
            cmd: npm run watch:test:base --
            args:
              - $get_test_file(file)
```

The layout file contains a lot of detail, but the main points are the three `app`
blocks containing the definition for how to open the three various programs.
Each `app` block has a _name_ and some _arguments_. The `Atom` program,
being an text editor, takes a file and a base folder to open. The `XTerm` terminal
accepts a _command_, a _directory_ to execute the command from and a list of _arguments_
to the command.

To start this layout run the `workflow` command with the layout and the file as an
argument.

```
python -m workflow js-test.yaml add.js
```

## Usage

```
pip install -r requirements/base.txt
python -m workflow <options>
```

### Development tools

```
pip install -r requirements/base.txt
```

```shell
py.test  # Run tests
flake8  # Check pep8 compliance
isort -rc workflow  # Automatically sort imports
```
