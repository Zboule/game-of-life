import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameOfLifeService } from 'src/app/services/game-of-life.service';
import { Subscription } from 'rxjs';
import { Universe } from 'src/app/models/Universe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  public universe: Universe;

  private subscriptions: Subscription[] = [];
  public universeState;

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
    this.gameOfLife.reset();

  }

}
