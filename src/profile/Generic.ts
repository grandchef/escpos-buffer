import Epson from './Epson';
import { Style } from '../Printer';

export default class Generic extends Epson {
  protected async setMode(mode: number, enable: boolean): Promise<void> {
    if (enable) {
      if (mode & Style.DoubleWidth) {
        return this.connection.write(Buffer.from('\x0E', 'ascii'));
      }
      if (mode & Style.DoubleHeight) {
        return this.connection.write(Buffer.from('\x1Bd1', 'ascii'));
      }
    } else {
      if (mode & Style.DoubleHeight) {
        return this.connection.write(Buffer.from('\x1Bd0', 'ascii'));
      }
      if (mode & Style.DoubleWidth) {
        return this.connection.write(Buffer.from('\x14', 'ascii'));
      }
    }
  }

  async qrcode(data: string, size: number): Promise<void> {
    return this.drawQrcode(data, size);
  }
}
