/// <reference types="node" />
import { Connection } from '.';
export default class InMemory implements Connection {
    list: Buffer[];
    open(): void;
    write(data: Buffer): void;
    close(): void;
    buffer(): Buffer;
}
