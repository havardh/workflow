export class Layout {
  constructor(props) {
    this.props = { ...props, type: 'layout' };
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}
