import Epson from './Epson';
import { Style } from '../Printer';

export default class Generic extends Epson {
  protected setMode(mode: number, enable: boolean): void {
    if (enable) {
      if (mode & Style.DoubleWidth) {
        this.connection.write(Buffer.from('\x0E', 'ascii'));
      }
      if (mode & Style.DoubleHeight) {
        this.connection.write(Buffer.from('\x1Bd1', 'ascii'));
      }
    } else {
      if (mode & Style.DoubleHeight) {
        this.connection.write(Buffer.from('\x1Bd0', 'ascii'));
      }
      if (mode & Style.DoubleWidth) {
        this.connection.write(Buffer.from('\x14', 'ascii'));
      }
    }
  }

  async qrcode(data: string, size: number) {
    await this.drawQrcode(data, size);
  }
}
