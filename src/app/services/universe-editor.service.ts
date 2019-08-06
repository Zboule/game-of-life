import { Injectable } from '@angular/core';
import { Universe } from '../models/Universe';
import { UniverseCoordinates } from '../models/UniverseCoordinates';
import { Cell } from '../models/Cell';

@Injectable({
  providedIn: 'root'
})
export class UniverseEditorService {

  constructor() { }

  public setCellValue(universe: Universe, coordinate: UniverseCoordinates, value: number): Universe {
    const newUniverse = this.copyUniverse(universe);
    newUniverse.cells[coordinate.verticalPosition][coordinate.horizontalPosition].age = value;
    return newUniverse;
  }


  public setCellsValueAtCenter(universe: Universe, cells: number[][]): Universe {

    if (cells === undefined || cells.length === 0 || cells[0].length === 0) {
      return universe;
    }
    const newUniverse = this.copyUniverse(universe);

    const startVertical = Math.floor((newUniverse.height / 2) - cells.length / 2);
    const startHorizontal = Math.floor((newUniverse.width / 2) - cells[0].length / 2);


    for (let verticalPosition = 0; verticalPosition < cells.length; verticalPosition++) {
      for (let horizontalPosition = 0; horizontalPosition < cells[verticalPosition].length; horizontalPosition++) {
        const cell = newUniverse.cells[startVertical + verticalPosition][startHorizontal + horizontalPosition];
        cell.age = cells[verticalPosition][horizontalPosition];
      }
    }
    return newUniverse;
  }

  public copyUniverse(universe: Universe): Universe {
    return {
      ...universe,
      cells: universe.cells.map((row) => [...row.map((cell) => ({ ...cell }))])
    };
  }

  public tickUniverse(universe: Universe): Universe {
    return {
      ...universe,
      age: universe.age + 1,
      cells: universe.cells.map((row) => {
        return row.map((cell) => {
          return {
            ...cell,
            age: this.getNextCellAge(universe, cell)
          };
        });
      })
    };
  }


  private getNextCellAge(universe: Universe, cell: Cell): number {
    const numberOfCellAround = this.getNumberOfCellAround(universe, cell);

    if (cell.age > 0) {
      if (numberOfCellAround < 2 || numberOfCellAround > 3) {
        return 0;
      } else {
        return cell.age + 1;
      }
    } else {
      if (numberOfCellAround === 3) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  private getNumberOfCellAround(universe: Universe, cell: Cell): number {

    let numberOfCellAround = 0;

    cell.nearby.forEach((coordinate) => {
      if (universe.cells[coordinate.verticalPosition][coordinate.horizontalPosition].age > 0) {
        numberOfCellAround++;
      }
    });

    return numberOfCellAround;
  }


}
