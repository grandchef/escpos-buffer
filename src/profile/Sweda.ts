import Elgin from './Elgin';

export default class Sweda extends Elgin {
  buzzer(): void {
    this.connection.write(Buffer.from('\x07', 'ascii'));
  }
}
