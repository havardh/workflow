/* eslint-env node */
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";

export default {
  input: "packages/workflow-core/src/index.js",
  output: {
    file: 'packages/workflow-core/dist/index.js',
    format: 'cjs'
  },
  plugins: [
    babel({ exclude: 'node_modules/**'}),
    alias({ shared: __dirname + "/packages/shared"})
  ],
  external: [
    "lodash",
    "os",
    "fs",
    "babel-core",
    "crypto"
  ]
}
