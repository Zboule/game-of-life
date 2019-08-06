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
  public observableValue: BehaviorSubject<number>;

  @Input()
  public horisontalPosition: number;

  @Input()
  public verticalPosition: number;

  @Input()
  public cellValue: number;

  constructor(private gameOfLife: GameOfLifeService) {
  }


  ngOnInit() {
    if (this.observableValue) {
      this.observableValue.subscribe((value) => {
        if (value > 0 || this.cellValue !== undefined) {
          this.cellValue = value;
        }
      });
    }

  }

  ngOnDestroy() {
    if (this.observableValue) {
      this.observableValue.unsubscribe();
    }
  }

  public onClickCell() {
    if (this.observableValue) {
      this.gameOfLife.stop();
      this.gameOfLife.setCellValue(
        { horizontalPosition: this.horisontalPosition, verticalPosition: this.verticalPosition },
        this.cellValue === 0 || this.cellValue === undefined ? 1 : 0
      );
    }
  }




}
