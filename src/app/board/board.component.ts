import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() cellValues: Array<string>;
  @Input() winningCombination: Array<number>;
  @Output() cellClicked = new EventEmitter<number>();

  triggerCellClicked(cellIndex: number): void {
    this.cellClicked.emit(cellIndex);
  }

  canHighlight(cellIndex: number): boolean {
    return this.winningCombination && this.winningCombination.indexOf(cellIndex) >= 0;
  }

  cellByIndex(index: number): number {
    return index;
  }
}
