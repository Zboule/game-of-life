import { Injectable } from '@angular/core';
import { Universe } from '../models/Universe';
import { UniverseCoordinates } from '../models/UniverseCoordinates';

@Injectable({
  providedIn: 'root'
})
export class UniverseEditorService {

  constructor() { }

  public setCellValue(universe: Universe, coordinate: UniverseCoordinates, value: number): Universe {
    const newUniverse = this.copyUniverse(universe);
    newUniverse.map[coordinate.heightPosition][coordinate.widthPosition] = value;
    return newUniverse;
  }

  public copyUniverse(universe: Universe): Universe {
    return {
      ...universe,
      map: universe.map.map((row) => [...row])
    };
  }

  public tickUniverse(universe: Universe): Universe {
    return {
      ...universe,
      age: universe.age + 1,
      map: universe.map.map((row, heightPosition) => {
        return row.map((cell, widthPosition) => {
          return this.getNextCellState(universe, { heightPosition, widthPosition });
        });
      })
    };
  }




  private getNextCellState(universe: Universe, coordinate: UniverseCoordinates): number {
    const numberOfCellAround = this.getNumberOfCellAround(universe, coordinate);
    const cellAge = universe.map[coordinate.heightPosition][coordinate.widthPosition];
    if (cellAge > 0) {
      if (numberOfCellAround < 2 || numberOfCellAround > 3) {
        return 0;
      } else {
        return cellAge + 1;
      }
    } else {
      if (numberOfCellAround === 3) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  private getNumberOfCellAround(universe: Universe, coordinate: UniverseCoordinates): number {

    let numberOfCellAround = 0;

    const universeMap = universe.map;
    const maxWidth = universe.width - 1;
    const maxHeight = universe.height - 1;
    const heightPosition = coordinate.heightPosition;
    const widthPosition = coordinate.widthPosition;

    if (heightPosition > 0) {
      numberOfCellAround += widthPosition > 0 && universeMap[heightPosition - 1][widthPosition - 1] ? 1 : 0;
      numberOfCellAround += universeMap[heightPosition - 1][widthPosition] ? 1 : 0;
      numberOfCellAround += widthPosition < maxWidth && universeMap[heightPosition - 1][widthPosition + 1] ? 1 : 0;
    }
    numberOfCellAround += widthPosition > 0 && universeMap[heightPosition][widthPosition - 1] ? 1 : 0;
    numberOfCellAround += widthPosition < maxWidth && universeMap[heightPosition][widthPosition + 1] ? 1 : 0;
    if (heightPosition < maxHeight) {
      numberOfCellAround += widthPosition > 0 && universeMap[heightPosition + 1][widthPosition - 1] ? 1 : 0;
      numberOfCellAround += universeMap[heightPosition + 1][widthPosition] ? 1 : 0;
      numberOfCellAround += widthPosition < maxWidth && universeMap[heightPosition + 1][widthPosition + 1] ? 1 : 0;
    }
    return numberOfCellAround;
  }
}
