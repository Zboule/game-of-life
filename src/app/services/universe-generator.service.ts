import { Injectable } from '@angular/core';
import { Universe } from '../models/Universe';

@Injectable({
  providedIn: 'root'
})
export class UniverseGeneratorService {

  constructor() { }

  public getEmptyUniverse(width: number, height: number): Universe {
    const map = Array(height).fill(Array(width).fill(0));
    return {
      width,
      height,
      age: 0,
      map
    };
  }

  public getFromUniverse(universe: Universe, width: number, height: number): Universe {
    const oldMap = universe.map;
    const map: number[][] = Array(height).fill(Array<number>(width).fill(0));

    map.forEach((row, heightIndex) => {
      if (heightIndex < oldMap.length) {
        row.forEach((cell, widthIndex) => {
          if (widthIndex < oldMap[heightIndex].length) {
            map[heightIndex][widthIndex] = oldMap[heightIndex][widthIndex];
          }
        });
      }
    });

    return {
      ...universe,
      width,
      height,
      map
    };
  }

}
