export class App {
  constructor(props) {
    this.props = { ...props, type: 'app' };
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}
