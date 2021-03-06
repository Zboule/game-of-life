import { TestBed, tick } from '@angular/core/testing';

import { UniverseEditorService } from './universe-editor.service';
import { UniverseGeneratorService } from './universe-generator.service';

describe('UniverseEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniverseEditorService = TestBed.get(UniverseEditorService);
    expect(service).toBeTruthy();
  });

  it('should set cell value', () => {
    const univeseEditor: UniverseEditorService = TestBed.get(UniverseEditorService);

    const univeseGenerator: UniverseGeneratorService = TestBed.get(UniverseGeneratorService);
    const universe = univeseGenerator.getEmptyUniverse(10, 10);

    const editedUniverse = univeseEditor.setCellValue(universe, { verticalPosition: 3, horizontalPosition: 6 }, 1);

    expect(editedUniverse === universe).toBeFalsy();
    expect(universe).not.toEqual(editedUniverse);

    expect(editedUniverse.cells[3][6]).toBeTruthy();
  });

  it('should copy the universe', () => {
    const univeseGenerator: UniverseGeneratorService = TestBed.get(UniverseGeneratorService);
    const universe = univeseGenerator.getEmptyUniverse(3, 3);

    const univeseEditor: UniverseEditorService = TestBed.get(UniverseEditorService);
    const universeCopy = univeseEditor.copyUniverse(universe);

    expect(universe).toEqual(universeCopy);
    expect(universe === universeCopy).toBeFalsy();


    for (let i = 0; i < universe.cells.length; i++) {
      expect(universe.cells[i] === universeCopy.cells[i]).toBeFalsy();
    }

  });


  it('should be efficient', () => {
    const univeseGenerator: UniverseGeneratorService = TestBed.get(UniverseGeneratorService);
    let universe = univeseGenerator.getEmptyUniverse(50, 50 );

    const univeseEditor: UniverseEditorService = TestBed.get(UniverseEditorService);

    universe = univeseEditor.setCellValue(universe, { verticalPosition: 501, horizontalPosition: 501 }, 1);
    universe = univeseEditor.setCellValue(universe, { verticalPosition: 501, horizontalPosition: 500 }, 1);
    universe = univeseEditor.setCellValue(universe, { verticalPosition: 500, horizontalPosition: 500 }, 1);
    universe = univeseEditor.setCellValue(universe, { verticalPosition: 500, horizontalPosition: 499 }, 1);
    universe = univeseEditor.setCellValue(universe, { verticalPosition: 499, horizontalPosition: 500 }, 1);

    for (let i = 0; i < 100; i++) {
      let tickTime = Date.now();
      universe = univeseEditor.tickUniverse(universe);
      tickTime = Date.now() - tickTime;
      console.log(tickTime);
      expect(tickTime).toBeLessThan(50);
    }
  });

});
