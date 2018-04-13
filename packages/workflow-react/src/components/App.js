import { omit } from 'lodash';

export default class App {

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
    this.children.forEach(child => child.render());
  }

  tree() {
    const { props, children } = this;
    return {
      type: "app",
      ...omit(props, 'children'),
      children: children.map(child => child.tree())
    };
  }

  render() {
    this.renderChildren();
  }
}
