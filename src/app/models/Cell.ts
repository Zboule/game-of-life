import { UniverseCoordinates } from './UniverseCoordinates';

export interface Cell {
    age: number;
    nearby: UniverseCoordinates[];
}
