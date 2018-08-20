import { platformDynamicServer } from '@angular/platform-server';
import { NgModule, Component, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { WorkflowPlatform, subscribe } from './workflowPlatform';

export default function createComponent(node) {
  @Component({
    selector: node.name.toLowerCase(),
    inputs: node.params,
    template: `${node.name} [<ng-content></ng-content>]`,
  })
  class Comp {
    constructor(@Inject(ElementRef) ref, @Inject(Renderer2) renderer) {
      for (let [key, value] of Object.entries(node)) {
        renderer.setProperty(ref.nativeElement, key, value);
      }
    }
  }

  return Comp;
}
