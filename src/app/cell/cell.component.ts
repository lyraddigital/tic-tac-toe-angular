import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  animations: [
    trigger('toggleDisplay', [
      state('notPopulated', style({ width: 0, height: 0 })),
      state('populated', style({ width: '12vmin', height: '12vmin' })),
      transition('notPopulated => populated', [
        animate('350ms')
      ])
    ])
  ]
})
export class CellComponent {
  @Input() value: string;
  @Input() canHighlight: boolean;
  @Output() cellClicked = new EventEmitter();
  cellState = 'notPopulated';

  ngOnInit() {
    console.log('Initializing Cell');
  }

  onCellClicked(): void {
    this.cellClicked.emit();
    this.cellState = 'populated';
  }
}
