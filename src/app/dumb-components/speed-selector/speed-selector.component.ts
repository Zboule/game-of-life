import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider/options';
import { ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-speed-selector',
  templateUrl: './speed-selector.component.html',
  styleUrls: ['./speed-selector.component.scss']
})
export class SpeedSelectorComponent implements OnInit {


  @Input()
  public selectedSpeed = 0;

  @Input()
  public availableSpeed: number[];

  @Output()
  public speedChangeEvent: EventEmitter<number> = new EventEmitter();

  public options: Options;

  constructor() {
  }

  ngOnInit() {
    this.setOptions();
  }

  public onUserChange(changeContext: ChangeContext): void {
    this.speedChangeEvent.emit(changeContext.value);
  }

  private setOptions() {
    this.options = {
      showSelectionBar: true,
      showTicks: true,
      stepsArray: this.availableSpeed.map((value) => ({ value })),
      translate: (value: number): string => {
        switch (value) {
          case 0:
            return 'Stop';
          case -1:
            return 'Max';
          default:
            return Math.floor(1000 / value) + ' fps';
        }
      }
    };
  }


}
