import Base from './base';

export default class Tile extends Base {

  apply(config) {
    const rect = this.getDesktopRect();

    const { root } = config;

    this.openNode(root);

    this.setPositions({ root, rect });
  }

  setPositions({ root, rect }) {
    if (root.children) {
      const { x, y, width, height } = rect;
      if (root.layout === 'splitv') {
        let startX = x;
        root.children.forEach((app) => {
          this.setPositions({
            root: app,
            rect: { x: startX, y, width: width * app.percent, height },
          });
          startX += width * app.percent;
        });
      } else {
        let startY = y;
        root.children.forEach((app) => {
          this.setPositions({
            root: app,
            rect: { x, y: startY, width, height: height * app.percent },
          });
          startY += height * app.percent;
        });
      }
    } else {
      this.setPosition({
        app: root,
        position: rect,
      });
    }
  }
}
