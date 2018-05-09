/* eslint-env browser */
/* eslint-disable no-console */
import Tile from 'shared/tile';

export default class Html extends Tile {

  constructor({container}) {
    super();
    this.scripts = [];
    if (typeof element === "string") {
      this.container = document.getElementById(container);
    } else {
      this.container = container;
    }
  }

  async getDesktopRect() {
    return {
      x: 0,
      y: 0,
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
  }

  async setPosition({app, position}) {
    this.container.appendChild(app.open({app, position}));
    return Promise.resolve();
  }

  async postApply() {
  }

  async runCmd() { // eslint-disable-line class-methods-use-this
    // app is opened in setPosition method
    return Promise.resolve({});
  }
}
