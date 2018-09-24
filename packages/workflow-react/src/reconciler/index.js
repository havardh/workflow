import Reconciler from 'react-reconciler';

const emptyObject = {};

import { createElement, getHostContextNode } from '../utils/createElement';

export const Renderer = Reconciler({
  createInstance(type, props) {
    return createElement(type, props);
  },

  createTextInstance(text) {
    return { text };
  },

  finalizeInitialChildren() {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(...args) {
    //console.log("prepareUpdate", args);
    return {};
  },

  resetAfterCommit() {
    // noop
  },

  getRootHostContext(instance) {
    return getHostContextNode(instance);
    // return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent() {
    return false;
  },

  now: () => {},

  isPrimaryRenderer: false,

  supportsMutation: true,

  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.root = child; // eslint-disable-line no-param-reassign
    }
  },

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.root = child; // eslint-disable-line no-param-reassign
    }
  },

  appendChildToContainer(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.root = child; // eslint-disable-line no-param-reassign
    }
  },

  removeChild() {
    // noop
  },

  removeChildFromContainer() {
    // noop
  },

  insertBefore() {
    // noop
  },

  insertInContainerBefore() {
    // noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    //instance.props = { ...instance.props, ...newProps };
  },

  commitMount() {
    // noop
  },

  commitTextUpdate(instance, oldText, newText) {
    instance.text = newText; // eslint-disable-line no-param-reassign
  },

  resetTextContent() {
    // noop
  },
});
