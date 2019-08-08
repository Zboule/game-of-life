import { Cell } from './Cell';

export interface Universe {
    readonly width: number;
    readonly height: number;
    readonly age: number;
    readonly cells: Cell[][];
}


