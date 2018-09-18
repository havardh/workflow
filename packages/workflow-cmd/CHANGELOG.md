# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/havardh/workflow/compare/workflow-cmd@1.3.2...workflow-cmd@2.0.0) (2018-09-18)


### Bug Fixes

* make `config.js` export named property `config` ([c393540](https://github.com/havardh/workflow/commit/c393540))


### Features

* use only named exports for all files. ([ca77860](https://github.com/havardh/workflow/commit/ca77860))
* **workflow-cmd:** add update --latest flag ([6095b02](https://github.com/havardh/workflow/commit/6095b02))


### BREAKING CHANGES

* changes the api exported by most modules.





<a name="1.3.2"></a>
## [1.3.2](https://github.com/havardh/workflow/compare/workflow-cmd@1.3.1...workflow-cmd@1.3.2) (2018-09-18)


### Bug Fixes

* improve workflow --help with script name and usage ([640a6d9](https://github.com/havardh/workflow/commit/640a6d9))





<a name="1.3.1"></a>
## [1.3.1](https://github.com/havardh/workflow/compare/workflow-cmd@1.3.0...workflow-cmd@1.3.1) (2018-09-12)

**Note:** Version bump only for package workflow-cmd





<a name="1.3.0"></a>
# [1.3.0](https://github.com/havardh/workflow/compare/workflow-cmd@1.2.1...workflow-cmd@1.3.0) (2018-09-11)


### Bug Fixes

* **workflow-cmd:** add missing dependency execa ([8ca4b00](https://github.com/havardh/workflow/commit/8ca4b00))
* **workflow-cmd:** re add out from npm i and workflow version ([d28e337](https://github.com/havardh/workflow/commit/d28e337))
* **workflow-cmd:** spelling mistake in workflow version --help ([9c12e47](https://github.com/havardh/workflow/commit/9c12e47))
* **workflow-cmd/update:** be more nice to non git users ([f954d8f](https://github.com/havardh/workflow/commit/f954d8f))


### Features

* **workflow-cmd:** implement workflow update ([fe722d1](https://github.com/havardh/workflow/commit/fe722d1))
* **workflow-cmd/update:** add safeguards and prompt ([545efc7](https://github.com/havardh/workflow/commit/545efc7))





<a name="1.2.1"></a>
## [1.2.1](https://github.com/havardh/workflow/compare/workflow-cmd@1.2.0...workflow-cmd@1.2.1) (2018-09-11)


### Bug Fixes

* update readme to force new version ([e6fd9a2](https://github.com/havardh/workflow/commit/e6fd9a2))





<a name="1.2.0"></a>
# [1.2.0](https://github.com/havardh/workflow/compare/workflow-cmd@1.1.1...workflow-cmd@1.2.0) (2018-09-11)


### Bug Fixes

* **workflow-cmd:** add eslint suppress for console ([55f5acf](https://github.com/havardh/workflow/commit/55f5acf))
* **workflow-cmd:** add missing dependency ([ab3a4c9](https://github.com/havardh/workflow/commit/ab3a4c9))


### Features

* **workflow-cmd:** add --verbose,-vv flag for verbose output ([f16f3cf](https://github.com/havardh/workflow/commit/f16f3cf))
* **workflow-cmd:** add simple version command ([d9dc4e4](https://github.com/havardh/workflow/commit/d9dc4e4))
* **workflow-cmd:** add verbose output of version command ([8a27750](https://github.com/havardh/workflow/commit/8a27750))





<a name="1.1.1"></a>
## [1.1.1](https://github.com/havardh/workflow/compare/workflow-cmd@1.1.0...workflow-cmd@1.1.1) (2018-09-10)


### Bug Fixes

* **workflow,workflow-cmd:** forcing new release due to wrong package ([6421c60](https://github.com/havardh/workflow/commit/6421c60))





<a name="1.1.0"></a>
# 1.1.0 (2018-09-10)


### Bug Fixes

* cleanup babel dependencies ([4eb9020](https://github.com/havardh/workflow/commit/4eb9020))
* fixes the import path of the Example in template ([abfb8d1](https://github.com/havardh/workflow/commit/abfb8d1))
* fixup flow and lint errors ([8c4a935](https://github.com/havardh/workflow/commit/8c4a935))
* import apps from index ([e59ef0d](https://github.com/havardh/workflow/commit/e59ef0d))
* improve failure when cmd requires a module which is not found ([036e3ce](https://github.com/havardh/workflow/commit/036e3ce))
* log debug mode information ([e402ac3](https://github.com/havardh/workflow/commit/e402ac3))
* make postinstall in workflow-cmd portable to windows ([1912fd5](https://github.com/havardh/workflow/commit/1912fd5))
* make ReactExample portable by importing default apps ([d256ef6](https://github.com/havardh/workflow/commit/d256ef6))
* make workflow command example work ([2497814](https://github.com/havardh/workflow/commit/2497814))
* minor fixes in cmd package naming and bins ([392b8cd](https://github.com/havardh/workflow/commit/392b8cd))
* remove node8 preset dependency ([f7d4da0](https://github.com/havardh/workflow/commit/f7d4da0))
* replace child_process.spawn with cross-spawn package ([91d9eeb](https://github.com/havardh/workflow/commit/91d9eeb))
* rewrite workflow-cmd to be bundled with rollup ([1830205](https://github.com/havardh/workflow/commit/1830205))
* style all js/ts files ([7b8e5f4](https://github.com/havardh/workflow/commit/7b8e5f4))
* support require and import for config.js ([7c3eb9c](https://github.com/havardh/workflow/commit/7c3eb9c))
* update depencies according to rollup missing deps ([5eaef7e](https://github.com/havardh/workflow/commit/5eaef7e))


### Features

* add yargs command line optstring parser ([a31e834](https://github.com/havardh/workflow/commit/a31e834)), closes [#89](https://github.com/havardh/workflow/issues/89) [#15](https://github.com/havardh/workflow/issues/15)
* copy Example flows if home dir is found ([d0f67e3](https://github.com/havardh/workflow/commit/d0f67e3))
* implement workflow package ([220805e](https://github.com/havardh/workflow/commit/220805e))
* improve postinstall command output ([f31f88b](https://github.com/havardh/workflow/commit/f31f88b))
* improve the development execution of workflow-cmd ([baa31e0](https://github.com/havardh/workflow/commit/baa31e0))
* make flows/Example use apps/default ([546e28a](https://github.com/havardh/workflow/commit/546e28a))
* make terminal wm kexec into script ([e521d06](https://github.com/havardh/workflow/commit/e521d06))
* rewirte workflow-cmd and template package use new core ([6aec8bc](https://github.com/havardh/workflow/commit/6aec8bc))
