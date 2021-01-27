import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { cellAnimations } from './cell.animations';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  animations: cellAnimations()
})
export class CellComponent {
  @Input() value: string;
  @Input() canHighlight: boolean;
  @Output() cellClicked = new EventEmitter();
  cellState: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.value?.currentValue === '') {
      this.cellState = 'notPopulated';
    }
  }

  onCellClicked(): void {
    this.cellClicked.emit();
    this.cellState = 'populated';
  }
}
