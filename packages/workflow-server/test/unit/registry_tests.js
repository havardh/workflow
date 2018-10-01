import React from 'react';
import { AppRegistry } from '../../src/registry';
import uuid from 'uuid';

import { render, Workspace, requireComponent } from 'workflow-react';

const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');
const { Terminal, TextEditor } = requireComponent('workflow-apps-defaults');

describe('AppRegistry', () => {
  let registry, app;
  beforeEach(() => {
    registry = new AppRegistry();
  });
  describe('.register(flow)', () => {
    it('should create appId for all closed apps', () => {
      const flow = render(
        <Workspace>
          <SplitV>
            <TextEditor />
            <TextEditor />
          </SplitV>
        </Workspace>
      );

      const registeredFlow = registry.register(flow);

      const [splitv] = registeredFlow.children;
      const [textEditor1, textEditor2] = splitv.children;
      expect(textEditor1.appId).not.toBeUndefined();
      expect(textEditor2.appId).not.toBeUndefined();
    });

    it('should map open apps by name', () => {
      const flow = render(
        <Workspace>
          <SplitV>
            <TextEditor />
            <TextEditor />
          </SplitV>
        </Workspace>
      );

      const first = registry.register(flow);
      const [splitvFirst] = first.children;
      const [textEditorOneFirst, textEditorTwoFirst] = splitvFirst.children;

      const second = registry.register(flow);
      const [splitvSecond] = second.children;
      const [textEditorOneSecond, textEditorTwoSecond] = splitvSecond.children;

      expect(textEditorOneFirst.appId).toBe(textEditorOneSecond.appId);
      expect(textEditorTwoFirst.appId).toBe(textEditorTwoSecond.appId);
    });

    it('should register all apps', () => {
      const flow = render(
        <Workspace>
          <SplitV>
            <TextEditor />
            <TextEditor />
          </SplitV>
        </Workspace>
      );

      const first = registry.register(flow);
      const [splitvFirst] = first.children;
      const [{ appId: firstAppId }, { appId: secondAppId }] = splitvFirst.children;

      expect(registry.findById({ appId: firstAppId })).not.toBe(null);
      expect(registry.findById({ appId: secondAppId })).not.toBe(null);
    });
  });

  describe('connect', () => {
    it('should mark app as open', () => {
      const flow = registry.register(
        render(
          <Workspace>
            <TextEditor />
          </Workspace>
        )
      );

      const { appId } = flow.children[0];
      const connected = registry.connect({ appId, send: () => {} });

      expect(connected.isOpen).toBe(true);
    });

    it('should return null for not found app', () => {
      const connected = registry.connect({ ...app, send: () => {} });

      expect(connected).toBe(null);
    });
  });

  describe('disconnnect', () => {
    it('should mark app as not open', () => {
      const flow = registry.register(
        render(
          <Workspace>
            <TextEditor />
          </Workspace>
        )
      );

      const { appId } = flow.children[0];
      const connected = registry.connect({ appId, send: () => {} });

      const disconnected = registry.disconnect({ appId });

      expect(registry.findById({ appId })).toBe(null);
    });
  });

  describe('.waitFor(app)', () => {
    it('should return a promise', () => {
      const promise = registry.waitFor({ appId: uuid.v4() });

      expect(promise).toBeInstanceOf(Promise);
    });

    it('should promise should resolve when app is connected', async () => {
      const flow = registry.register(
        render(
          <Workspace>
            <TextEditor />
          </Workspace>
        )
      );

      const appId = flow.children[0].appId;

      const promise = registry.waitFor({ appId });

      const send = () => {};
      registry.connect({ appId, send });

      const app = await promise;
      expect(app.send).toBe(send);
    });
  });
});
