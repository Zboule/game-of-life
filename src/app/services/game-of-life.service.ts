import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Universe } from '../models/Universe';
import { UniverseGeneratorService } from './universe-generator.service';
import { UniverseEditorService } from './universe-editor.service';
import { UniverseCoordinates } from '../models/UniverseCoordinates';
import { ExportedCells } from '../models/ExportedCells';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  private generationTime = 500;
  private intervalHandler: any;
  private universe: BehaviorSubject<Universe>;
  public universeState: BehaviorSubject<'started' | 'stoped'>;

  constructor(
    private universeGenerator: UniverseGeneratorService,
    private universeEditor: UniverseEditorService
  ) {
    this.universeState = new BehaviorSubject('stoped');
    this.universe = new BehaviorSubject(this.universeGenerator.getEmptyUniverse(10, 10));
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

  public start() {
    clearInterval(this.intervalHandler);
    this.universeState.next('started');
    this.intervalHandler = setInterval(() => {
      this.universe.next(this.universeEditor.tickUniverse(this.universe.value));
    }, this.generationTime);
  }

  public stop() {
    clearInterval(this.intervalHandler);
    this.universeState.next('stoped');
  }

  public reset(cells: ExportedCells) {
    this.stop();
    // Créer un universe avec des valeurs par default
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
