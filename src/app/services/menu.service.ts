import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuLevel: BehaviorSubject<number>;

  constructor() {
    this.menuLevel = new BehaviorSubject(0);
  }
}
