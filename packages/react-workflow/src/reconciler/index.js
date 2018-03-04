import emptyObject from 'fbjs/lib/emptyObject';
import { createElement, getHostContextNode } from '../utils/createElement';

import Reconciler from 'react-reconciler';

const WorkflowRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.root = child;
    }
  },

  createInstance(type, props) {
    return createElement(type, props);/*
    return {
      type,
      children: [],
      prop: props.prop,
    };*/
  },

  createTextInstance(text) {
    return { text };
  },

  finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(element, type, oldProps, newProps) {
    return {};
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(element) {
    // noop
  },

  getRootHostContext(instance) {
    return getHostContextNode(instance);
    // return emptyObject;
  },

  getChildHostContext(instance) {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.root = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.root = child;
      }
    },

    removeChild(parentInstance, child) {
      // noop
    },

    removeChildFromContainer(parentInstance, child) {
      // noop
    },

    insertBefore(parentInstance, child, beforeChild) {
      // noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      instance.prop = newProps.prop;
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },

    commitTextUpdate(instance, oldText, newText) {
      instance.text = newText;
    },
  },
});

export default WorkflowRenderer;
