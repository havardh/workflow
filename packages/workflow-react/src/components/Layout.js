import { omit } from 'lodash';

export default class Layout {

  static defaultProps = {
    percent: 1,
  }

  constructor(props) {
    this.props = props;
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  renderChildren() {
    for (const child of this.children) {
      child.render();
    }
  }

  tree() {
    const { props, children } = this;

    return {
      ...omit(props, 'children'),
      children: children.map(child => child.tree()),
    };
  }

  render() {
    this.renderChildren();
  }
}

Layout.defaultProps = {
  percent: 1,
};
