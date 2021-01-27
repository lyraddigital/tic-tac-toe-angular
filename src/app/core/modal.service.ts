import { ApplicationRef, ComponentFactoryResolver, ElementRef, EmbeddedViewRef, Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';

import { Modal, ResultModal } from './models/result-modal';
import { ResultModalComponent } from '../shared/result-modal/result-modal.component';

@Injectable({ providedIn: 'root'})
export class ModalService {
  private renderer: Renderer2;
  private placeHolderElement: HTMLElement;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setModalPlaceholder(elementRef: ElementRef): void {
    this.placeHolderElement = elementRef.nativeElement as HTMLElement;
  }

  showResultModal(winner: string): Modal {
    if (!this.placeHolderElement) {
      throw new Error(`
        No placeholder element was set that the modal
        could attach itself to
      `);
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ResultModalComponent);
    const modalComponentRef = componentFactory.create(this.injector);
    const overlayElement = ((modalComponentRef).hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const resultModal = new ResultModal();

    modalComponentRef.instance.winner = winner;
    this.applicationRef.attachView(modalComponentRef.hostView);

    modalComponentRef.instance.closed.subscribe(() => {
      this.applicationRef.detachView(modalComponentRef.hostView);
      modalComponentRef.destroy();
      resultModal.close();
    });

    this.renderer.appendChild(this.placeHolderElement, overlayElement);

    return resultModal;
  }
}
