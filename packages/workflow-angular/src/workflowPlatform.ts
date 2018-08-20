import {
  Renderer2,
  RendererFactory2,
  NgModule,
  ApplicationInitStatus,
  ApplicationRef,
  APP_INITIALIZER,
  NgZone,
  ErrorHandler,
  Sanitizer,
  SecurityContext,
} from '@angular/core';

class Node {
  type: 'workspace' | 'layout' | 'app';
  children: Node[] = [];
}

class InMemoryRootRenderer implements RendererFactory2 {
  createRenderer(hostElement: any, type: RendererType2 | any): Renderer2 {
    const renderer = new InMemoryRenderer();
    this.renderer = renderer;
    return renderer;
  }
}

class InMemoryRenderer implements Renderer2 {
  constructor() {
    this.roots = [];
  }

  selectRootElement(selector: string): Node {
    const el = new Node();
    this.roots.push(el);
    return el;
  }

  createElement(name: string, namespace?: string | any): Node {
    return new Node();
  }

  createComment(value: string): any {}

  createText(value: string): string {}

  destroyNode(node: Node): any {}

  destroy(): void {}

  appendChild(parent: Node, newChild: Node): void {
    if (newChild instanceof Node) {
      parent.children.push(newChild);
    }
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {}

  removeChild(parent: any, oldChild: any): void {}

  parentNode(node: Node): Node {}

  nextSibling(node: Node): any {}

  setAttribute(el: Node, name: string, value: string, namespace?: string | any): void {
    console.log(name, value);
    el[name] = value;
  }

  removeAttribute(el: any, name: string, namespace?: string | any): void {}

  addClass(el: any, name: string): void {}

  removeClass(el: any, name: string): void {}

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {}

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {}

  setProperty(el: Node, name: string, value: any): void {
    el[name] = value;
  }

  setValue(node: Node, value: string): void {}

  listen(
    target: 'window' | 'document' | 'body' | Node,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {}
}

const listeners = [];

function setUpRenderFlushing(zone: NgZone, rootRenderer: InMemoryRootRenderer) {
  return () => {
    zone.onStable.subscribe(() => {
      console.log('wat');
      for (let listener of listeners) {
        listener(rootRenderer.renderer.roots[0].children[0]);
      }
    });
  };
}

class WorkflowSanitizer implements Sanitizer {
  sanitize(ctx: SecurityContext, value: any): string {
    return value;
  }
}

function errorHandler(): ErrorHandler {
  return new ErrorHandler();
}

@NgModule({
  imports: [],
  exports: [],
  providers: [
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    { provide: ApplicationInitStatus, useClass: ApplicationInitStatus },
    { provide: ApplicationRef, useClass: ApplicationRef },
    { provide: Sanitizer, useClass: Sanitizer },
    { provide: RendererFactory2, useClass: InMemoryRootRenderer },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: setUpRenderFlushing,
      deps: [NgZone, RendererFactory2],
    },
  ],
})
export class WorkflowPlatform {}

export function subscribe(listener) {
  listeners.push(listener);
}
