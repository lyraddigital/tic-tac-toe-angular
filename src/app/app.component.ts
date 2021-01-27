import { Component, ElementRef } from '@angular/core';

import { ModalService } from './core/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private elementRef: ElementRef,
    private modalService: ModalService
  ) {
    this.modalService.setModalPlaceholder(this.elementRef);
  }
}
