import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css']
})
export class ResultModalComponent {
  @Input() winner: string;
  @Output() closed = new EventEmitter();

  triggerClose(): void {
    this.closed.emit();
  }

  get message(): string {
    return this.winner ? `Winner is ${this.winner}.` : 'It is a tie';
  }
}
