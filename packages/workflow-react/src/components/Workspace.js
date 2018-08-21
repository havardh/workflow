export default class Workspace {
  constructor(props) {
    this.props = { ...props, type: 'workspace' };
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}
