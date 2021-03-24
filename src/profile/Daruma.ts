import Epson from './Epson';
import { Drawer, Style, Align } from '../Printer';
import { Font } from '../capabilities';

export default class Daruma extends Epson {
  drawer(number: Drawer, _: number, __: number): void {
    const index = {
      [Drawer.First]: 'p',
      [Drawer.Second]: 'p',
    };
    this.connection.write(Buffer.from('\x1B' + index[number], 'ascii'));
  }

  set alignment(align: Align) {
    const cmd = {
      [Align.Left]: '\x1Bj0',
      [Align.Center]: '\x1Bj1',
      [Align.Right]: '\x1Bj2',
    };
    this.connection.write(Buffer.from(cmd[align], 'ascii'));
  }

  protected setStyle(style: Style, enable: boolean): void {
    if (enable) {
      // enable styles
      if (Style.Bold == style) {
        this.connection.write(Buffer.from('\x1BE', 'ascii'));
        return;
      }
    } else {
      // disable styles
      if (Style.Bold == style) {
        this.connection.write(Buffer.from('\x1BF', 'ascii'));
        return;
      }
    }
    return super.setStyle(style, enable);
  }

  protected setMode(mode: number, enable: boolean): void {
    if (enable) {
      if (mode & Style.DoubleWidth) {
        this.connection.write(Buffer.from('\x0E', 'ascii'));
      }
      if (mode & Style.DoubleHeight) {
        this.connection.write(Buffer.from('\x1Bw1', 'ascii'));
      }
    } else {
      if (mode & Style.DoubleHeight) {
        this.connection.write(Buffer.from('\x1Bw0', 'ascii'));
      }
      if (mode & Style.DoubleWidth) {
        this.connection.write(Buffer.from('\x14', 'ascii'));
      }
    }
  }

  feed(lines: number): void {
    this.connection.write(Buffer.from('\r\n'.repeat(lines), 'ascii'));
  }

  initialize() {
    this.fontChanged(this.font, this.font);
  }

  protected fontChanged(current: Font, previows: Font) {
    super.fontChanged(current, previows);
    this.applyCodePage();
  }

  async qrcode(data: string, size: number) {
    const len = data.length + 2;
    const pL = String.fromCharCode(len & 0xff);
    const pH = String.fromCharCode((len >> 8) & 0xff);
    const error = 'M';
    const _size = String.fromCharCode(Math.min(7, Math.max(3, size || 4)));
    this.connection.write(Buffer.from('\x1B\x81', 'ascii'));
    this.connection.write(Buffer.from(pL + pH, 'ascii'));
    this.connection.write(Buffer.from(_size + error, 'ascii'));
    this.connection.write(Buffer.from(data, 'ascii'));
  }

  protected get bitmapCmd(): string {
    return '\x1B*m';
  }
}
