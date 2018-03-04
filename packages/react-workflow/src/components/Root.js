export default class Root {

  constructor() {
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
    return this.children[0].tree();
  }

  render() {
    this.renderChildren();
  }

}
