import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Universe } from '../models/Universe';
import { UniverseGeneratorService } from './universe-generator.service';
import { UniverseEditorService } from './universe-editor.service';
import { UniverseCoordinates } from '../models/UniverseCoordinates';
import { ExportedCells } from '../models/ExportedCells';

export const defaultCells: { viewValue: string, cells: ExportedCells }[] = [
  { viewValue: 'Grille vide', cells: [] },
  { viewValue: 'The R-pentomino', cells: [[0, 1, 1], [1, 1, 0], [0, 1, 0]] },
  { viewValue: 'Diehard', cells: [[0, 0, 0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 1]] },
  { viewValue: 'Acorn', cells: [[0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 0, 0, 1, 1, 1]] },
  { viewValue: 'Light-weight spaceship', cells: [[1, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1]] },
  {
    viewValue: 'Gun', cells: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
];

export type GenerationTime = 0 | 1000 | 500 | 100 | -1;
export const GenerationTimeValues: GenerationTime[] = [0, 1000, 500, 100, -1];

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  public generationTime: BehaviorSubject<GenerationTime>;
  private intervalHandler: any;
  private universe: BehaviorSubject<Universe>;

  constructor(
    private universeGenerator: UniverseGeneratorService,
    private universeEditor: UniverseEditorService
  ) {
    this.generationTime = new BehaviorSubject(0);
    this.universe = new BehaviorSubject(this.universeGenerator.getEmptyUniverse(0, 0));
  }

  public getUniverse(): Observable<Universe> {
    return this.universe;
  }

  public setCellValue(coordinate: UniverseCoordinates, value: number) {
    const newUniverse = this.universeEditor.setCellValue(this.universe.value, coordinate, value);
    this.universe.next(newUniverse);
  }

  public setUniversSize(width: number, height: number) {
    this.universe.next(this.universeGenerator.getFromUniverse(this.universe.value, width, height));
  }


  public setGenerationTime(generationTime: GenerationTime) {
    if (this.generationTime.value !== generationTime) {
      this.stop();
      this.generationTime.next(generationTime);
      if (generationTime !== 0) {
        this.start();
      }

    }
  }

  private start() {
    clearInterval(this.intervalHandler);
    this.intervalHandler = setInterval(() => {
      this.universe.next(this.universeEditor.tickUniverse(this.universe.value));
    }, this.generationTime.value);
  }

  private stop() {
    clearInterval(this.intervalHandler);
  }

  public reset(cells: ExportedCells) {
    this.generationTime.next(0);
    this.stop();
    let newUniverse = this.universeGenerator.getEmptyUniverse(this.universe.value.width, this.universe.value.height);
    newUniverse = this.universeEditor.setCellsValueAtCenter(newUniverse, cells);
    this.universe.next(newUniverse);
  }

  public exportToConsole() {

    let minVerticalPosition: number;
    let maxVerticalPosition = 0;
    let minHorizontalPosition: number;
    let maxHorizontalPosition = 0;

    this.universe.value.cells.forEach((cellRow, verticalPosition) => {
      cellRow.forEach((cell, horizontalPosition) => {
        if (cell.age > 0) {
          if (minHorizontalPosition === undefined || minHorizontalPosition > horizontalPosition) {
            minHorizontalPosition = horizontalPosition;
          }
          if (minVerticalPosition === undefined || minVerticalPosition > verticalPosition) {
            minVerticalPosition = verticalPosition;
          }
          if (maxHorizontalPosition < horizontalPosition) {
            maxHorizontalPosition = horizontalPosition;
          }
          if (maxVerticalPosition < verticalPosition) {
            maxVerticalPosition = verticalPosition;
          }
        }
      });
    });

    const asTruncatedMatrice = [];
    for (let verticalPosition = minVerticalPosition; verticalPosition <= maxVerticalPosition; verticalPosition++) {
      const cellRow = [];
      for (let horizontalPosition = minHorizontalPosition; horizontalPosition <= maxHorizontalPosition; horizontalPosition++) {
        cellRow.push(this.universe.value.cells[verticalPosition][horizontalPosition].age);
      }
      asTruncatedMatrice.push(cellRow);
    }
    console.log(JSON.stringify(asTruncatedMatrice));

  }




}
