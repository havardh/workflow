import {join} from "path";
import WorkflowResolverRelative from "workflow-resolver-relative";
import WorkflowResolverAbsolute from "workflow-resolver-absolute";
import WorkflowLoaderBabel from "workflow-loader-babel";
import WorkflowTransformerApplyArgumentsToFields from "workflow-transformer-apply-arguments-to-fields";
import WorkflowWmOsx from "workflow-wm-osx";

const config = {
  presets: [
    "flow",
    "react",
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  plugins: ["transform-object-rest-spread", "transform-class-properties"]
};

export default {
  resolvers: [
    new WorkflowResolverAbsolute(),
    new WorkflowResolverRelative({path: process.cwd()}),
    new WorkflowResolverRelative({path: join(__dirname, "flows")})
  ],
  loader: new WorkflowLoaderBabel({config}),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  wm: new WorkflowWmOsx()
};
