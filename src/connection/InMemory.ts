import { Connection } from '.';

export default class InMemory implements Connection {
  list: Buffer[];

  open(): void {
    this.list = [];
  }

  write(data: Buffer): void {
    this.list.push(data);
  }

  close(): void {}

  buffer() {
    return Buffer.concat(this.list);
  }
}
