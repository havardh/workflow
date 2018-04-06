// @flow
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Tile from '../../../src/wms/tile';

chai.use(sinonChai);

const windowRect = { x: 0, y: 0, width: 1024, height: 768 };

class SpyWm extends Tile {
  constructor() {
    super();
    this.getDesktopRect = sinon.stub();
    this.setPosition = sinon.stub();
    this.runCmd = sinon.stub();
  }
}

describe('Tile', () => {
  let wm;
  function expectApp(app) {
    return {
      toBeAt(position) {
        expect(wm.setPosition).to.have.been.calledWith({ app, position });
      },
    };
  }

  beforeEach(() => {
    wm = new SpyWm();

    wm.getDesktopRect.returns(windowRect);
  });

  it('should find the desktop rectangle', async () => {
    const app = { percent: 1.0, open: 'open app', class: 'test' };
    await wm.apply({ root: app, name: 'test' });

    expect(wm.getDesktopRect).to.have.been.called;
  });

  describe('when the config contains a root app', () => {
    const app = { percent: 1.0, open: 'open app', class: 'test' };
    const config = { name: 'test-config', root: app };

    it('should call runCmd with the app command', async () => {
      await wm.apply(config);

      expect(wm.runCmd).to.have.been.calledWithMatch({ open: 'open app' });
    });

    it('should call setPosition with the entire desktop rectangle', async () => {
      await wm.apply(config);

      expectApp(app).toBeAt(windowRect);
    });
  });

  describe('when the config contains two apps with horizontal split', () => {
    const app1 = { percent: 0.5, open: 'app 1', class: 'test' };
    const app2 = { percent: 0.5, open: 'app 2', class: 'test' };
    const config = {
      name: 'test-config',
      root: {
        layout: 'splith',
        percent: 1.0,
        children: [app1, app2],
      },
    };

    it('should call runCmd on both apps', async () => {
      await wm.apply(config);

      expect(wm.runCmd).to.have.been.calledWithMatch(app1);
      expect(wm.runCmd).to.have.been.calledWithMatch(app2);
    });

    it('should call setPosition with the left tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 0, width: 512, height: 768 };
      expectApp(app1).toBeAt(position);
    });

    it('should call setPosition with the right tile for the second app', async () => {
      await wm.apply(config);

      const position = { x: 512, y: 0, width: 512, height: 768 };
      expectApp(app2).toBeAt(position);
    });
  });

  describe('when the config contains two apps with vertical split', () => {
    const app1 = { percent: 0.5, open: 'app 1', class: 'test' };
    const app2 = { percent: 0.5, open: 'app 2', class: 'test' };
    const config = {
      name: 'test-config',
      root: {
        layout: 'splitv',
        percent: 1.0,
        children: [app1, app2],
      },
    };

    it('should call runCmd on both apps', async () => {
      await wm.apply(config);

      expect(wm.runCmd).to.have.been.calledWithMatch(app1);
      expect(wm.runCmd).to.have.been.calledWithMatch(app2);
    });

    it('should call setPosition with the top tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 0, width: 1024, height: 768 / 2 };
      expectApp(app1).toBeAt(position);
    });

    it('should call setPosition with the bottom tile for the second app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 384, width: 1024, height: 768 / 2 };
      expectApp(app2).toBeAt(position);
    });
  });

  describe('when the config contains three apps with horizontal split', () => {
    const app1 = { percent: 0.33, open: 'app 1', class: 'test' };
    const app2 = { percent: 0.33, open: 'app 2', class: 'test' };
    const app3 = { percent: 0.34, open: 'app 3', class: 'test' };
    const config = {
      name: 'test-config',
      root: {
        layout: 'splith',
        percent: 1.0,
        children: [app1, app2, app3],
      },
    };

    it('should call runCmd on all apps', async () => {
      await wm.apply(config);

      expect(wm.runCmd).to.have.been.calledWithMatch(app1);
      expect(wm.runCmd).to.have.been.calledWithMatch(app2);
      expect(wm.runCmd).to.have.been.calledWithMatch(app3);
    });

    it('should call setPosition with the left tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 0, width: 1024 * 0.33, height: 768 };
      expectApp(app1).toBeAt(position);
    });

    it('should call setPosition with the middle tile for the second app', async () => {
      await wm.apply(config);

      const position = { x: 1024 * 0.33, y: 0, width: 1024 * 0.33, height: 768 };
      expectApp(app2).toBeAt(position);
    });

    it('should call setPosition with the right tile for the third app', async () => {
      await wm.apply(config);

      const position = { x: 2 * 1024 * 0.33, y: 0, width: 1024 * 0.34, height: 768 };
      expectApp(app3).toBeAt(position);
    });
  });

  describe('when the config contains three apps with vertical split', () => {
    const app1 = { percent: 0.33, open: 'app 1', class: 'test' };
    const app2 = { percent: 0.33, open: 'app 2', class: 'test' };
    const app3 = { percent: 0.34, open: 'app 3', class: 'test' };
    const config = {
      name: 'test-config',
      root: {
        layout: 'splitv',
        percent: 1.0,
        children: [app1, app2, app3],
      },
    };

    it('should call runCmd on all apps', async () => {
      await wm.apply(config);

      expect(wm.runCmd).to.have.been.calledWithMatch(app1);
      expect(wm.runCmd).to.have.been.calledWithMatch(app2);
      expect(wm.runCmd).to.have.been.calledWithMatch(app3);
    });

    it('should call setPosition with the top tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 0, width: 1024, height: 768 * 0.33 };
      expectApp(app1).toBeAt(position);
    });

    it('should call setPosition with the middle tile for the second app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 768 * 0.33, width: 1024, height: 768 * 0.33 };
      expectApp(app2).toBeAt(position);
    });

    it('should call setPosition with the right tile for the third app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 2 * 768 * 0.33, width: 1024, height: 768 * 0.34 };
      expectApp(app3).toBeAt(position);
    });
  });

  describe('when the config contains nested splits', () => {
    const app1 = { percent: 0.5, open: 'app 1', class: 'test' };
    const app2 = { percent: 0.5, open: 'app 2', class: 'test' };
    const app3 = { percent: 0.2, open: 'app 3', class: 'test' };
    const config = {
      name: 'test-config',
      root: {
        layout: 'splitv',
        percent: 1.0,
        children: [{
          layout: 'splith',
          percent: 0.8,
          children: [app1, app2],
        }, app3],
      },
    };

    it('should call runCmd on all apps', async () => {
      await wm.apply(config);

      expect(wm.runCmd).to.have.been.calledWithMatch(app1);
      expect(wm.runCmd).to.have.been.calledWithMatch(app2);
      expect(wm.runCmd).to.have.been.calledWithMatch(app3);
    });

    it('should call setPosition on the top left tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 0, width: 512, height: 768 * 0.8 };
      expectApp(app1).toBeAt(position);
    });

    it('should call setPosition on the top left tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 512, y: 0, width: 512, height: 768 * 0.8 };
      expectApp(app2).toBeAt(position);
    });

    it('should call setPosition on the top left tile for the first app', async () => {
      await wm.apply(config);

      const position = { x: 0, y: 768 * 0.8, width: 1024, height: 768 * 0.2 };
      expectApp(app3).toBeAt(position);
    });
  });
});
