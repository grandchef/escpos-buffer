import Elgin from './Elgin';
import { Cut } from '../Printer';

export default class Perto extends Elgin {
  buzzer(): void {
    this.connection.write(Buffer.from('\x07', 'ascii'));
  }

  cutter(_: Cut): void {
    this.connection.write(Buffer.from('\x1BJ\x18\x1DVB(', 'ascii'));
  }
}
