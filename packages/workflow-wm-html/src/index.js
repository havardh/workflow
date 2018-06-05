/* eslint-env browser */
/* eslint-disable no-console */
import {findAllApps} from 'shared/tree';

export default class Html {

  constructor({container}) {
    this.scripts = [];
    if (typeof element === "string") {
      this.container = document.getElementById(container);
    } else {
      this.container = container;
    }
  }

  async screen() {
    return {
      left: 0,
      top: 0,
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    for (let app of apps) {
      const {position} = app;
      this.container.appendChild(app.open({app, position}));
    }
  }
}
