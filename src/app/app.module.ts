import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameOfLifeComponent } from './components/game-of-life/game-of-life.component';
import { MenuComponent } from './components/menu/menu.component';
import { CellComponent } from './dumb-components/cell/cell.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SpeedSelectorComponent } from './dumb-components/speed-selector/speed-selector.component';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  declarations: [
    AppComponent,
    GameOfLifeComponent,
    MenuComponent,
    CellComponent,
    SpeedSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
