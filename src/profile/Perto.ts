import Elgin from './Elgin';
import { Cut } from '../actions';

export default class Perto extends Elgin {
  async buzzer(): Promise<void> {
    return this.connection.write(Buffer.from('\x07', 'ascii'));
  }

  async cutter(_: Cut): Promise<void> {
    return this.connection.write(Buffer.from('\x1BJ\x18\x1DVB(', 'ascii'));
  }
}
