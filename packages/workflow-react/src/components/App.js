import { omit } from 'lodash';

export default class App {

  static defaultProps: {
    percent: 1,
  }

  constructor(props) {
    this.props = props;
  }

  tree() {
    const { props } = this;
    return {
      type: "app",
      ...omit(props, 'children'),
    };
  }

  render() { // eslint-disable-line class-methods-use-this
  }
}
