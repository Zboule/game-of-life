import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GameOfLifeService } from '../../services/game-of-life.service';
import { Universe } from '../../models/Universe';
import { Subscription, fromEvent, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('universeContainer', { static: false }) universeContainer: ElementRef;

  public universe: Universe;
  private subscriptions: Subscription[] = [];

  public observableCells: BehaviorSubject<number>[][] = [];

  constructor(private gameOfLife: GameOfLifeService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.gameOfLife.getUniverse().subscribe(this.onNewUniverse)
    );

    this.subscriptions.push(
      fromEvent(window, 'resize').subscribe(evt => {
        this.setUniverseSize();
      })
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setUniverseSize();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  public setUniverseSize() {
    const nbInHeight = Math.floor(this.universeContainer.nativeElement.offsetHeight / 22);
    const nbInWidth = Math.floor(this.universeContainer.nativeElement.offsetWidth / 22);
    this.gameOfLife.setUniversSize(nbInWidth, nbInHeight);
  }


  private onNewUniverse = (universe: Universe): void => {
    if (this.universe === undefined || this.universe.height !== universe.height || this.universe.width !== universe.width) {
      this.observableCells = universe.map.map((rowOfCell) => {
        return rowOfCell.map((cell) => {
          return new BehaviorSubject(cell);
        });
      });
    } else {
      universe.map.forEach((rowOfCell, verticalPosition) => {
        rowOfCell.forEach((cell, horisontalPosition) => {
          const observableCell = this.observableCells[verticalPosition][horisontalPosition];
          if (observableCell.value !== cell) {
            observableCell.next(cell);
          }
        });
      });
    }

    this.universe = universe;

  }

}
