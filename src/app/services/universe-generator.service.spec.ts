import { TestBed } from '@angular/core/testing';

import { UniverseGeneratorService } from './universe-generator.service';

describe('UniverseGeneratorService', () => {

  let service: UniverseGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(UniverseGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be generate empty universe', () => {
    const width = 10;
    const height = 30;
    const universe = service.getEmptyUniverse(width, height);

    expect(universe.age).toEqual(0);
    expect(universe.map.length).toEqual(height);

    universe.map.forEach((universeRow) => {
      expect(universeRow.length).toEqual(width);
      universeRow.forEach((cell) => {
        expect(cell).toBe(0);
      });
    });
  });


});
