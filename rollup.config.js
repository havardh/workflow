/* eslint-env node */
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";

const bundles = [{
  name: "workflow-core",
  external: [
    "lodash",
    "os",
    "fs",
    "child_process",
    "shelljs",
    "python-shell",
    "babel-core",
    "crypto",
    "workflow-wm-i3",
    "workflow-wm-osx"
  ]
}, {
  name: "workflow-wm-osx",
  external: ["osascript", "shelljs"]
}]

function createConfig(bundle) {
  const {name, external} = bundle;

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
    external: bundle.external
  };
}

export default bundles.map(createConfig);
