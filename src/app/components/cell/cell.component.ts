import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameOfLifeService } from 'src/app/services/game-of-life.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, OnDestroy {

  @Input()
  observableValue: BehaviorSubject<number>;

  @Input()
  horisontalPosition: number;

  @Input()
  verticalPosition: number;

  cellValue = 0;

  constructor(private gameOfLife: GameOfLifeService) {
  }


  ngOnInit() {
    this.observableValue.subscribe((value) => {
      this.cellValue = value;
    });
  }

  ngOnDestroy() {
    this.observableValue.unsubscribe();
  }

  public onClickCell() {
    this.gameOfLife.setCellValue(
      { widthPosition: this.horisontalPosition, heightPosition: this.verticalPosition },
      this.cellValue !== 0 ? 0 : 1
    );
  }




}
