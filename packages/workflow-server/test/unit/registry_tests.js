import { AppRegistry } from '../../src/registry';

function createApp() {
  return {
    type: 'app',
    name: 'App',
    open: function() {},
    update: function() {},
  };
}

describe('AppRegistry', () => {
  let registry, app;
  beforeEach(() => {
    registry = new AppRegistry();
    app = createApp();
  });
  describe('.register(app)', () => {
    it('should create appId', () => {
      const registeredApp = registry.register(app);

      expect(registeredApp.open).toBe(app.open);
      expect(registeredApp.update).toBe(app.update);
      expect(registeredApp.appId).toBeDefined();
    });

    it('should be registered as not open', () => {
      const registered = registry.register(app);

      expect(registered.isOpen).toBe(false);
    });

    it('should not add appId to argument', () => {
      registry.register(app);

      expect(app.appId).toBeUndefined();
    });

    it('should make the app retrievable by id', () => {
      const registeredApp = registry.register(app);

      const { app: foundApp } = registry.findById(registeredApp);

      expect(foundApp.open).toBe(foundApp.open);
      expect(foundApp.update).toBe(foundApp.update);
      expect(foundApp).toEqual(registeredApp);
    });

    it('return the same app if already registered', () => {
      const first = registry.register(app);
      const second = registry.register(first);

      expect(first).toEqual(second);
    });

    it('should reuse open app by name if app is unregistered', () => {
      const first = registry.register(app);
      registry.connect(first);

      registry.unregister();
      const second = registry.register(app);

      expect(first.appId).not.toEqual(second.appId);
      expect(second.isOpen).toBe(true);
    });

    it('should not find app by name if registered', () => {
      registry.register(app);

      const found = registry.findByName(app);

      expect(found).toBe(null);
    });
  });

  describe('.unregister()', () => {
    it('should not find any apps after unregister', () => {
      const registered = registry.register(app);

      registry.unregister();

      const found = registry.findById(registered);
      expect(found).toBe(null);
    });
  });

  describe('connect', () => {
    it('should mark app as open', () => {
      const registered = registry.register(app);

      const connected = registry.connect({ ...registered, send: () => {} });

      expect(connected.isOpen).toBe(true);
    });

    it('should return null for not found app', () => {
      const connected = registry.connect({ ...app, send: () => {} });

      expect(connected).toBe(null);
    });
  });

  describe('disconnnect', () => {
    it('should mark app as not open', () => {
      const registered = registry.register(app);
      const connected = registry.connect({ ...registered, send: () => {} });

      const disconnected = registry.disconnect(connected);

      expect(disconnected.isOpen).toBe(false);
      expect(disconnected.send).toBeUndefined();
    });
  });
});
