export class Async {
  constructor(props) {
    this.props = { ...props, type: 'async' };
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}
