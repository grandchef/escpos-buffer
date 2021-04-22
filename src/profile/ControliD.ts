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
    const tipo = '2';
    const _size = String.fromCharCode(size || 4);
    const error = '0';
    const len = data.length + 3;
    const pL = String.fromCharCode(len & 0xff);
    const pH = String.fromCharCode((len >> 8) & 0xff);
    this.connection.write(
      Buffer.from('\x1D(k\x04\x001A' + tipo + '\x00', 'ascii'),
    );
    this.connection.write(Buffer.from('\x1D(k\x03\x001C' + _size, 'ascii'));
    this.connection.write(Buffer.from('\x1D(k\x03\x001E' + error, 'ascii'));
    this.connection.write(Buffer.from('\x1D(k' + pL + pH + '1P0', 'ascii'));
    this.connection.write(Buffer.from(data, 'ascii'));
    this.connection.write(Buffer.from('\x1D(k\x03\x001Q0', 'ascii'));
  }
}
