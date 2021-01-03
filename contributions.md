# Contributing

Thanks for showing an interest in contributing to workflow!

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead] by
Kent C. Dodds.

By making a contribution to this project you agree to abide by the 
[Code of Conduct][code-of-conduct].

## Project setup

This project uses the [workspaces][yarn-workspaces] feature of the `yarn` 
package manager. 

1.  Fork and clone the repo
2.  `yarn` - set up dependencies and link modules
3.  `yarn build` - builds modules into dist folders
3.  `git checkout -b <branch>` Create a branch for your PR 

Most of the packages have an example under the `flows` folder which can be
executed with `yarn example` inside the package folder. Some of these example 
only run on specific platforms.

### Tests and static analysis

- `yarn eslint` - ESLint. Please fix any errors/warnings :)
- `yarn format` - Prettier js to autoformat all code.
- `yarn test unit` - Runs the unit tests
- `yarn test integration` - Runs platform dependent integration tests

#### Continuous integration

There are four ci jobs for the workflow project. These are the unit test suite
which is executed on Circle CI and the platform dependent integration tests executed
on Circle ci (linux-i3), travis ci (osx) and appveyor (windows). 

Each of the integration tests runs a given flow and takes a screenshot of the result.
This screenshot is compared with commited version for an exact match. When the tests
fails the ci jobs will store the results as artifacts. As these images are hard to 
generate locally for windows and osx, the travis and appveyor jobs are set up to 
push a branch with the updated images, for the case where the changes are expected. 
The linux versions can be reproduced locally with the docker image. 

## Conventions

The [angular commit guide][angular-commit] line is used to govern commit messages. 

## Help needed

Please checkout the [the open issues][issues]

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

## Attribution

This guide is adapted from the [Downshift][downshift] contributors guide.

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[issues]: https://github.com/havardh/workflow/issues
[downshift]: https://github.com/paypal/downshift
[yarn-workspaces]: https://yarnpkg.com/lang/en/docs/workspaces/
[angular-commit]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[code-of-conduct]: code-of-conduct.md
