import Epson from './Epson';
import { Style } from '../actions';
import { Font } from '../capabilities';

export default class ControliD extends Epson {
  protected async setStyle(style: Style, enable: boolean): Promise<void> {
    if (enable) {
      // enable styles
      if (Style.Bold == style) {
        return this.connection.write(Buffer.from('\x1BE\x01', 'ascii'));
      }
    } else {
      // disable styles
      if (Style.Bold == style) {
        return this.connection.write(Buffer.from('\x1BE\x00', 'ascii'));
      }
    }
    return super.setStyle(style, enable);
  }

  async qrcode(data: string, size: number) {
    // Print iD Touch qrcode works with epson commands
    if (this.capabilities.model == 'PrintiD-Touch') {
      return super.qrcode(data, size);
    } else {
      return this.drawQrcode(data, size);
    }
  }

  async initialize() {
    await super.initialize();
    return this.fontChanged(this.font, this.font);
  }

  protected async fontChanged(current: Font, previows: Font) {
    if (current.name == 'Font C') {
      return this.connection.write(Buffer.from('\x1BM\x02', 'ascii'));
    } else {
      // Font A and B
      return super.fontChanged(current, previows);
    }
  }
}
