/* eslint-env node */
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";

import {readdirSync} from "fs";
import {resolve, join} from "path";

const blackList = [
  "workflow-apps-defaults",
  "workflow-apps-html",
  "workflow-cmd",
  "workflow-layout",
  "workflow-layouts",
  "workflow-template",
  "workflow-web"
];

const nodeInternalDependencies = {
  "workflow-wm-windows": ["child_process", "cross-spawn"],
  "workflow-resolver-absolute": ["fs", "path", "util"],
  "workflow-resolver-relative": ["fs", "path", "util"]
};

function createConfig(bundle) {
  const {name, external = []} = bundle;

  return {
    input: `packages/${name}/src/index.js`,
    output: {
      file: `packages/${name}/dist/index.js`,
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**'}),
      alias({ shared: __dirname + "/packages/shared"})
    ],
    external
  };
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

  return { name, external };
});

export default bundles.map(createConfig);
