import {join} from "path";
import WorkflowResolverRelative from "workflow-resolver-relative";
import WorkflowResolverAbsolute from "workflow-resolver-absolute";
import WorkflowLoaderBabel from "workflow-loader-babel";
import WorkflowParserArguments from "workflow-parser-arguments";
import WorkflowTransformerApplyArgumentsToFields from "workflow-transformer-apply-arguments-to-fields";
import WorkflowLayout from "workflow-layout";
import WorkflowWmWindows from "workflow-wm-windows";

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
  layout: new WorkflowLayout(),
  wm: new WorkflowWmWindows()
};
