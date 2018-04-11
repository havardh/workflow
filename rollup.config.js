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
    "workflow-wm-osx",
    "workflow-wm-windows"
  ]
}, {
  name: "workflow-wm-osx",
  external: ["osascript", "shelljs"]
}, {
  name: "workflow-wm-windows",
  external: ["ffi", "ref", "ref-struct", "lodash", "child_process"]
}, {
  name: "workflow-wm-windows-python",
  external: ["python-shell"]
}, {
  name: "workflow-wm-wmctrl",
  external: ["python-shell"]
}];

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
