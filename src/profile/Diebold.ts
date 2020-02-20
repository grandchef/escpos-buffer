import Elgin from './Elgin';
import { Drawer } from '../Printer';

export default class Diebold extends Elgin {
  buzzer(): void {
    this.connection.write(Buffer.from('\x07', 'ascii'));
  }

  drawer(number: Drawer, on_time: number, off_time: number): void {
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
    this.connection.write(
      Buffer.from(
        '\x1B&' + index[number] + on_time_char + off_time_char,
        'ascii',
      ),
    );
  }
}
