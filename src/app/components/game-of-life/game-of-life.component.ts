import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GameOfLifeService } from '../../services/game-of-life.service';
import { Universe } from '../../models/Universe';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('universeContainer', { static: false }) universeContainer: ElementRef;

  public universe: Universe;

  private subscriptions: Subscription[] = [];

  constructor(private gameOfLife: GameOfLifeService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.gameOfLife.getUniverse().subscribe((universe) => {
        this.universe = universe;
      })
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

  public onClickCell(heightPosition: number, widthPosition: number, value: number) {
    this.gameOfLife.setCellValue({ widthPosition, heightPosition }, value !== 0 ? 0 : 1);
  }

  public setUniverseSize() {
    const nbInHeight = Math.floor(this.universeContainer.nativeElement.offsetHeight / 22);
    const nbInWidth = Math.floor(this.universeContainer.nativeElement.offsetWidth / 22);
    this.gameOfLife.setUniversSize(nbInWidth, nbInHeight);
  }

}
