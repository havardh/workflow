/* eslint-env node */
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";
import postcss from "rollup-plugin-postcss";

import {readdirSync} from "fs";
import {resolve, join} from "path";

import flatMap from "lodash.flatmap";

const blackList = [
  "workflow-apps-defaults",
  "workflow-layout",
  "workflow-layouts",
  "workflow-template",
  "workflow-web"
];

const nodeInternalDependencies = {
  "workflow-wm-windows": ["child_process", "cross-spawn"],
  "workflow-resolver-absolute": ["fs", "path", "util"],
  "workflow-resolver-relative": ["fs", "path", "util"],
  "workflow-cmd": ["path", "os", "child_process"]
};

const sourceRoots = {
  "workflow-layout-yoga": ["index.js", "components.js"],
  "workflow-cmd": ["cli.js", "index.js", "npm.js", "platform.js"]
}

function createConfig(bundle) {
  const {name, external, roots} = bundle;

  return roots.map(root => ({
    input: `packages/${name}/src/${root}`,
    output: {
      file: `packages/${name}/dist/${root}`,
      format: 'cjs'
    },
    plugins: [
      postcss({plugins: []}),
      babel({ exclude: 'node_modules/**'}),
      alias({ shared: __dirname + "/packages/shared"}),
    ],
    external
  }));
}

const isPackage = name => name.startsWith("workflow-");
const isNotBlackListed = name => !blackList.includes(name);

const files = readdirSync(resolve("packages"));
const packages = files
  .filter(isPackage)
  .filter(isNotBlackListed);

const bundles = packages.map(name => {
  const packageJson = require(join(__dirname, "packages", name, "package.json"));
  const {dependencies} = packageJson;

  let external = [];
  if (dependencies) {
    external = Object.keys(dependencies);
  }

  if (nodeInternalDependencies[name]) {
    external.push(...nodeInternalDependencies[name]);
  }

  let roots = ["index.js"]
  if (sourceRoots[name]) {
    roots = sourceRoots[name];
  }

  return { name, external, roots };
});

export default flatMap(bundles, createConfig);
