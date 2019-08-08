import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('cell', { static: false }) cell !: ElementRef;

  @Input()
  public observableValue: BehaviorSubject<number>;

  @Input()
  public horisontalPosition: number;

  @Input()
  public verticalPosition: number;

  @Input()
  public cellValue: number;


  private _generationTime: number;
  @Input()
  public set generationTime(generationTime: number) {
    this._generationTime = generationTime === 0 ? 500 : generationTime;
    this.updateGenerationTime();
  }

  @Output()
  public userSetCellValue: EventEmitter<number> = new EventEmitter();

  private subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.observableValue) {
      this.subscriptions.push(
        this.observableValue.subscribe((value) => {
          if (value > 0 || this.cellValue !== undefined) {
            this.cellValue = value;
          }
        })
      );
    }
  }

  ngAfterViewInit() {
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public onClickCell() {
    if (this.observableValue) {
      this.userSetCellValue.emit(this.cellValue === 0 || this.cellValue === undefined ? 1 : 0);
    }
  }


  public mouseEnter(mouseEvent: MouseEvent) {
    if (this.observableValue && mouseEvent.buttons === 1) {
      this.userSetCellValue.emit(this.cellValue === 0 || this.cellValue === undefined ? 1 : 0);
    }
  }


  public updateGenerationTime() {
    if (this.cell !== undefined) {
      this.cell.nativeElement.style.animationDuration = this._generationTime + 'ms';
    }
  }

}
