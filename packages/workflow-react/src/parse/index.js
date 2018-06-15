import {omit} from "lodash";
import {Root, Workspace, App, Layout} from "../components/index";

const parse = (component) => {
  const {children, props} = component;

  if (component instanceof Root) {
    return { ...parse(children[0]) };
  } else if (component instanceof Workspace) {
    return {
      type: "workspace",
      ...omit(props, "children"),
      root: parse(children[0])
    };
  } else if (component instanceof App) {
    return {
      type: "app",
      ...omit(props, "children"),
      children: children.map(parse)
    };
  } else if (component instanceof Layout) {
    return {
      type: "layout",
      ...omit(props, "children"),
      children: children.map(parse)
    };
  } else {
    throw new Error("Component unknown: ", JSON.stringify(component));
  }
};

export default parse;
