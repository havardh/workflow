export class App {
  constructor(props) {
    console.log(props.open);
    console.log(props.update);
    this.props = { ...props };
    this.props.type = 'app';
    this.open = props.open;
    this.update = props.update;
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}
