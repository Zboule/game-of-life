import { Cell } from './Cell';

export interface Universe {
    readonly width: number;
    readonly height: number;
    readonly age: number;
    readonly cells: Cell[][];
}



export const defaultCells: { [key: string]: number[][] } = {
    abc: [[1, 1], [1, 0], [1, 0]]
};
