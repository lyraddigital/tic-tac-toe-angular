import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';

import { Modal, ResultModal } from './models/result-modal';
import { ResultModalComponent } from '../shared/result-modal/result-modal.component';

@Injectable({ providedIn: 'root'})
export class ModalService {
  private renderer: Renderer2;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  showResultModal(winner: string): Modal {
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

    this.renderer.appendChild(document.body, overlayElement);

    return resultModal;
  }
}
