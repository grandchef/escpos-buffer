/// <reference types="node" />
import { Filter } from './filter';
export default class Image {
    data: Buffer;
    lines: number;
    width: number;
    bytesPerRow: number;
    constructor(input: string | Buffer, filter?: Filter);
    loadImage(filename: string, filter: Filter): void;
    loadImageData(data: Buffer, filter: Filter): void;
    private readImage;
    lineData(index: number): Buffer;
}
