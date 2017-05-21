import Base from './base';

export default class Tile extends Base {

  async apply(config) {
    const rect = await this.getDesktopRect();

    const { root } = config;

    await this.openNode(root);

    return this.setPositions({ root, rect });
  }

  setPositions({ root, rect }) {
    if (root.children) {
      const { x, y, width, height } = rect;
      let tiles;
      if (root.layout === 'splitv') {
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
