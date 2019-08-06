import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameOfLifeService } from 'src/app/services/game-of-life.service';
import { Subscription } from 'rxjs';
import { Universe } from 'src/app/models/Universe';
import { ExportedCells } from 'src/app/models/ExportedCells';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  public universe: Universe;

  private subscriptions: Subscription[] = [];
  public universeState: 'started' | 'stoped';

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
