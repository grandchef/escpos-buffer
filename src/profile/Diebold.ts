import Elgin from './Elgin';
import { Cut, Drawer } from '../actions';
import { Font } from '../capabilities';

export default class Diebold extends Elgin {
  async buzzer(): Promise<void> {
    return this.connection.write(Buffer.from('\x07', 'ascii'));
  }

  async initialize(): Promise<void> {
    await this.setCodepage(this.capabilities.codepage);
    await this.setColumns(this.capabilities.columns);
  }

  protected async fontChanged(_: Font, __: Font) {}

  async cutter(_: Cut): Promise<void> {
    return this.connection.write(Buffer.from('\x1Bw', 'ascii'));
  }

  async drawer(
    number: Drawer,
    on_time: number,
    off_time: number,
  ): Promise<void> {
    const index = {
      [Drawer.First]: '0',
      [Drawer.Second]: '1',
    };
    const on_time_char = String.fromCharCode(
      Math.min(Math.trunc(on_time / 2), 65),
    );
    const off_time_char = String.fromCharCode(
      Math.min(Math.trunc(off_time / 2), 65),
    );
    return this.connection.write(
      Buffer.from(
        '\x1B&' + index[number] + on_time_char + off_time_char,
        'ascii',
      ),
    );
  }
}
