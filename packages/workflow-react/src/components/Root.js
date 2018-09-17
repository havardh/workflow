export class Root {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  renderChildren() {
    this.children.forEach(child => child.render());
  }

  tree() {
    return this.children[0].tree();
  }

  render() {
    this.renderChildren();
  }
}
