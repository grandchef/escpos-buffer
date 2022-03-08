import Elgin from './Elgin';

export default class Dataregis extends Elgin {
  async buzzer(): Promise<void> {
    return this.connection.write(Buffer.from('\x07', 'ascii'));
  }
}
