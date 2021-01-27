import { Injectable } from '@angular/core';

import { CalcResult } from './models/calc-result';

@Injectable({ providedIn: 'root' })
export class WinnerService {
  private winningMatrix: { [id: number]: Array<Array<number>> } = {
    0: [[1, 2], [3, 6], [4, 8]],
    1: [[0, 2], [4, 7]],
    2: [[0, 1], [5, 8], [4, 6]],
    3: [[0, 6], [4, 5]],
    4: [[2, 6], [3, 5], [1, 7], [0, 8]],
    5: [[3, 4], [2, 8]],
    6: [[7, 8], [0, 3], [2, 4]],
    7: [[6, 8], [1, 4]],
    8: [[6, 7], [2, 5], [0, 4]]
  };

  public calculateWinner(cellValues: Array<string>, numberOfTurnsLeft: number, currentCellIndex: number): CalcResult {
    const winningRanges = this.winningMatrix[currentCellIndex];
    const currentValue = cellValues[currentCellIndex];

    for (const range of winningRanges) {
      const optionOne = range[0];
      const optionTwo = range[1];
      const optionOneValue = cellValues[optionOne];
      const optionTwoValue = cellValues[optionTwo];

      if (currentValue === optionOneValue && optionOneValue === optionTwoValue) {
        return {
          hasResult: true,
          winner: currentValue,
          winningCombination: [currentCellIndex, optionOne, optionTwo]
        };
      }
    }

    if (numberOfTurnsLeft === 0) {
      return {
        hasResult: true,
        winner: undefined,
        winningCombination: []
      };
    }

    return {
      hasResult: false,
      winner: undefined,
      winningCombination: []
    };
  }
}
