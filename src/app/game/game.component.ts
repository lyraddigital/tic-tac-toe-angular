import { Component } from '@angular/core';

import { ModalService } from '../core/modal.service';
import { WinnerService } from '../core/winner.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  xIsNext: boolean;
  cellValues: Array<string>;
  numberOfTurns: number;
  winningCombination: Array<number>;

  constructor(
    private modalService: ModalService,
    private winnerService: WinnerService
  ) {
    this.startNewGame();
  }

  cellClicked(cellIndex: number): void {
    if (this.cellIsEmpty(cellIndex)) {
      this.cellValues[cellIndex] = this.xIsNext ? 'X' : 'O';
      this.xIsNext = !this.xIsNext;
      this.numberOfTurns--;

      const calcResult = this.winnerService.calculateWinner(this.cellValues, this.numberOfTurns, cellIndex);

      if (calcResult.hasResult) {
        this.winningCombination = calcResult.winningCombination;
        this.modalService.showResultModal(calcResult.winner).onClosed.subscribe(() => {
          this.startNewGame();
        });
      }
    }
  }

  private cellIsEmpty(cellIndex: number): boolean {
    return this.cellValues[cellIndex] === '';
  }

  private startNewGame(): void {
    this.xIsNext = true;
    this.cellValues = ['', '', '', '', '', '', '', '', ''];
    this.numberOfTurns = this.cellValues.length;
    this.winningCombination = [];
  }
}
