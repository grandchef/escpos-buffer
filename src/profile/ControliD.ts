import Epson from './Epson';
import { Style } from '../Printer';
import { Font } from '../capabilities';

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
    // for some reason, the Print iD Touch does not work with electron.
    // https://github.com/grandchef/escpos-buffer/issues/16
    if(this.capabilities.model == 'PrintiD-Touch') {
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
    } else {
      await this.drawQrcode(data, size);
    }
  }

  initialize() {
    super.initialize();
    this.fontChanged(this.font, this.font);
  }

  protected fontChanged(current: Font, previows: Font) {
    if (current.name == 'Font C') {
      this.connection.write(Buffer.from('\x1BM\x02', 'ascii'));
    } else {
      // Font A and B
      super.fontChanged(current, previows);
    }
  }
}
