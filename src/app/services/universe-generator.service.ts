import { Injectable } from '@angular/core';
import { Universe } from '../models/Universe';
import { Cell } from '../models/Cell';

@Injectable({
  providedIn: 'root'
})
export class UniverseGeneratorService {

  constructor() { }

  public getEmptyUniverse(width: number, height: number): Universe {
    // const cells = Array<Array<Cell>>(height).fill(Array<Cell>(width).fill(0));


    const cells = [];
    for (let verticalPosition = 0; verticalPosition < height; verticalPosition++) {
      const cellsRow: Cell[] = [];
      for (let horizontalPosition = 0; horizontalPosition < width; horizontalPosition++) {

        cellsRow.push({
          age: 0,
          nearby: [
            {
              horizontalPosition: horizontalPosition === 0 ? width - 1 : horizontalPosition - 1,
              verticalPosition: verticalPosition === 0 ? height - 1 : verticalPosition - 1
            },
            {
              horizontalPosition,
              verticalPosition: verticalPosition === 0 ? height - 1 : verticalPosition - 1
            },
            {
              horizontalPosition: horizontalPosition === width - 1 ? 0 : horizontalPosition + 1,
              verticalPosition: verticalPosition === 0 ? height - 1 : verticalPosition - 1
            },

            {
              horizontalPosition: horizontalPosition === 0 ? width - 1 : horizontalPosition - 1,
              verticalPosition
            },
            {
              horizontalPosition: horizontalPosition === width - 1 ? 0 : horizontalPosition + 1,
              verticalPosition
            },

            {
              horizontalPosition: horizontalPosition === 0 ? width - 1 : horizontalPosition - 1,
              verticalPosition: verticalPosition === height - 1 ? 0 : verticalPosition + 1,
            },
            {
              horizontalPosition,
              verticalPosition: verticalPosition === height - 1 ? 0 : verticalPosition + 1,
            },
            {
              horizontalPosition: horizontalPosition === width - 1 ? 0 : horizontalPosition + 1,
              verticalPosition: verticalPosition === height - 1 ? 0 : verticalPosition + 1,
            },
          ]
        });
      }
      cells.push(cellsRow);
    }

    return {
      width,
      height,
      age: 0,
      cells
    };
  }

  public getFromUniverse(oldUniverse: Universe, width: number, height: number): Universe {

    const newUniverse = this.getEmptyUniverse(width, height);

    newUniverse.cells.forEach((row, verticalPosition) => {
      if (verticalPosition < oldUniverse.height) {
        row.forEach((cell, horizontalPosition) => {
          if (horizontalPosition < oldUniverse.width) {
            cell.age = oldUniverse.cells[verticalPosition][horizontalPosition].age;
          }
        });
      }
    });

    return newUniverse;
  }

}
