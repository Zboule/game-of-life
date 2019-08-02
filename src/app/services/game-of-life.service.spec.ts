import { TestBed } from '@angular/core/testing';

import { GameOfLifeService } from './game-of-life.service';

describe('GameOfLifeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    expect(service).toBeTruthy();
  });

  it('should have a default universe', (done) => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    service.getUniverse().subscribe((universe) => {
      expect(universe).toBeTruthy();
      done();
    });
  });


  it('should have living cell', (done) => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    service.setCellValue({ heightPosition: 3, widthPosition: 6 }, 1);
    service.getUniverse().subscribe((universe) => {
      expect(universe.map[3][6]).toBeTruthy();
      done();
    });
  });




});
