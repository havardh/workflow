import { omit } from 'lodash';

export default class Workspace {

  constructor(props) {
    this.props = props;
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  renderChildren() {
    this.children.forEach(child => child.render());
  }

  tree() {
    const { props, children } = this;

    return {
      ...omit(props, 'children'),
      root: children[0].tree(),
    };
  }

  render() {
    this.renderChildren();
  }

}
