import Epson from './Epson';
import { Style } from '../Printer';

export default class ControliD extends Epson {
  protected setStyle(style: Style, enable: boolean): void {
    if (enable) {
      // enable styles
      if (Style.Bold == style) {
        this.connection.write(Buffer.from('\x1BE\x01', 'ascii'));
        return;
      }
    } else {
      // disable styles
      if (Style.Bold == style) {
        this.connection.write(Buffer.from('\x1BE\x00', 'ascii'));
        return;
      }
    }
    return super.setStyle(style, enable);
  }

  async qrcode(data: string, size: number) {
    await this.drawQrcode(data, size);
  }
}
