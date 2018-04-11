/* eslint-disable class-methods-use-this */
import Base from './base';

export default class Tile extends Base {

  getDesktopRect() {
    throw new Error('Not implemented');
  }

  setPosition({ app, position }) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  async apply(config) {
    const rect = await this.getDesktopRect();

    const { root } = config;

    await this.openNode(root);

    const positions = await this.setPositions({ root, rect });

    await this.postApply();

    return positions;
  }

  async postApply() {
  }

  setPositions({ root, rect }) {
    if (root.children) {
      const { x, y, width, height } = rect;
      let tiles;
      if (root.layout === 'splith') {
        let startX = x;
        tiles = root.children.map((app) => {
          const currentStartX = startX;
          startX += width * app.percent;
          return {
            root: app,
            rect: { x: currentStartX, y, width: width * app.percent, height },
          };
        });
      } else {
        let startY = y;
        tiles = root.children.map((app) => {
          const currentStartY = startY;
          startY += height * app.percent;
          return {
            root: app,
            rect: { x, y: currentStartY, width, height: height * app.percent },
          };
        });
      }

      return Promise.all(tiles.map(tile => this.setPositions(tile)));
    }

    return this.setPosition({
      app: root,
      position: rect,
    });
  }
}
