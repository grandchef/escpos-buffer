import Elgin from './Elgin';

export default class Dataregis extends Elgin {
  buzzer(): void {
    this.connection.write(Buffer.from('\x07', 'ascii'));
  }
}
