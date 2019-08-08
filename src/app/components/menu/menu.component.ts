import { Component, OnInit, OnDestroy, QueryList, ViewChildren, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GameOfLifeService, GenerationTime, defaultCells } from 'src/app/services/game-of-life.service';
import { Subscription } from 'rxjs';
import { Universe } from 'src/app/models/Universe';
import { MenuService } from 'src/app/services/menu.service';
import { GenerationTimeValues } from 'src/app/services/game-of-life.service';

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
  public generationTime: GenerationTime;
  public defaultCells = defaultCells;

  public selectedDefault = defaultCells[0];

  public availableSpeed = GenerationTimeValues;

  constructor(
    public gameOfLife: GameOfLifeService,
    public menuService: MenuService,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.gameOfLife.getUniverse().subscribe((universe) => {
        this.universe = universe;
      })
    );

    this.subscriptions.push(
      this.gameOfLife.generationTime.subscribe((generationTime) => {
        this.generationTime = generationTime;
      })
    );

    this.subscriptions.push(
      this.menuService.menuLevel.subscribe((menuLevel) => {
        this.updateVisibleMenuLevel(menuLevel);
      })
    );
  }
  ngAfterViewInit() {
    this.updateVisibleMenuLevel(this.menuService.menuLevel.value);

    if (this.elRef.nativeElement.offsetHeight < this.elRef.nativeElement.offsetWidth) {
      const menuHeight = this.elRef.nativeElement.offsetHeight;
      this.containers.forEach((container) => {
        container.nativeElement.style.minHeight = menuHeight + 'px';
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onSpeedChange(generationTime: GenerationTime) {
    this.gameOfLife.setGenerationTime(generationTime);
  }

  public reset() {
    this.menuService.menuLevel.next(0);
    this.gameOfLife.reset(this.selectedDefault.cells);
  }

  public export() {
    this.gameOfLife.exportToConsole();
  }

  public updateVisibleMenuLevel(visibleMenuLevel: number) {
    if (!this.containers) {
      return;
    }
    let heightToShow = 0;
    this.containers.forEach((elementRef, menuLevel) => {
      if (menuLevel !== 0 && menuLevel <= visibleMenuLevel) {
        heightToShow += elementRef.nativeElement.clientHeight;
      }
    });
    this.menu.nativeElement.style.top = -heightToShow + 'px';
  }
}
