import { Component, OnInit, OnDestroy, QueryList, ViewChildren, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GameOfLifeService } from 'src/app/services/game-of-life.service';
import { Subscription } from 'rxjs';
import { Universe } from 'src/app/models/Universe';
import { ExportedCells } from 'src/app/models/ExportedCells';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('container') containers !: QueryList<ElementRef>;
  @ViewChild('menu', { static: false }) menu !: ElementRef;

  public universe: Universe;

  private subscriptions: Subscription[] = [];
  public universeState: 'started' | 'stoped';

  // tslint:disable-next-line: variable-name
  private _menuLevel = 0;

  public get visibleMenuLevel(): number {
    return this._menuLevel;
  }

  public set visibleMenuLevel(visibleMenuLevel: number) {
    let heightToShow = 0;
    this.containers.forEach((elementRef, menuLevel) => {
      if (menuLevel !== 0 && menuLevel <= visibleMenuLevel) {
        heightToShow += elementRef.nativeElement.clientHeight;
      }
    });
    this.menu.nativeElement.style.top = -heightToShow + 'px';
    this._menuLevel = visibleMenuLevel;
  }

  // TODO: Put that away and rename it
  public defaultCells: { viewValue: string, cells: ExportedCells }[] = [
    { viewValue: 'Vide', cells: [] },
    { viewValue: 'The R-pentomino', cells: [[0, 1, 1], [1, 1, 0], [0, 1, 0]] },
    { viewValue: 'Diehard', cells: [[0, 0, 0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 1]] },
    { viewValue: 'Acorn', cells: [[0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 0, 0, 1, 1, 1]] },
    { viewValue: 'Light-weight spaceship', cells: [[1, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1]] },
    { viewValue: 'Gun', cells: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  ];

  public selectedDefault = this.defaultCells[0];

  constructor(public gameOfLife: GameOfLifeService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.gameOfLife.getUniverse().subscribe((universe) => {
        this.universe = universe;
      })
    );

    this.subscriptions.push(
      this.gameOfLife.universeState.subscribe((universeState) => {
        this.universeState = universeState;
      })
    );
  }

  ngAfterViewInit() {
    this.visibleMenuLevel = 0;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public start() {
    this.gameOfLife.start();
  }

  public stop() {
    this.gameOfLife.stop();
  }

  public reset() {
    this.gameOfLife.reset(this.selectedDefault.cells);
  }

  public export() {
    this.gameOfLife.exportToConsole();
  }

}
