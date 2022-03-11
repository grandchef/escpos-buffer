import Epson from './Epson';
import { Align, Style, Drawer } from '../actions';
import { Font } from '../capabilities';

export default class Daruma extends Epson {
  async drawer(number: Drawer, _: number, __: number): Promise<void> {
    const index = {
      [Drawer.First]: 'p',
      [Drawer.Second]: 'p',
    };
    return this.connection.write(Buffer.from('\x1B' + index[number], 'ascii'));
  }

  async setAlignment(align: Align): Promise<void> {
    const cmd = {
      [Align.Left]: '\x1Bj0',
      [Align.Center]: '\x1Bj1',
      [Align.Right]: '\x1Bj2',
    };
    return this.connection.write(Buffer.from(cmd[align], 'ascii'));
  }

  protected async setStyle(style: Style, enable: boolean): Promise<void> {
    if (enable) {
      // enable styles
      if (Style.Bold == style) {
        return this.connection.write(Buffer.from('\x1BE', 'ascii'));
      }
    } else {
      // disable styles
      if (Style.Bold == style) {
        return this.connection.write(Buffer.from('\x1BF', 'ascii'));
      }
    }
    return super.setStyle(style, enable);
  }

  protected async setMode(mode: number, enable: boolean): Promise<void> {
    if (enable) {
      if (mode & Style.DoubleWidth) {
        await this.connection.write(Buffer.from('\x0E', 'ascii'));
      }
      if (mode & Style.DoubleHeight) {
        await this.connection.write(Buffer.from('\x1Bw1', 'ascii'));
      }
    } else {
      if (mode & Style.DoubleHeight) {
        await this.connection.write(Buffer.from('\x1Bw0', 'ascii'));
      }
      if (mode & Style.DoubleWidth) {
        await this.connection.write(Buffer.from('\x14', 'ascii'));
      }
    }
  }

  async feed(lines: number): Promise<void> {
    return this.connection.write(Buffer.from('\r\n'.repeat(lines), 'ascii'));
  }

  async initialize() {
    await this.setCodepage(this.capabilities.codepage);
    await this.setColumns(this.capabilities.columns);
    if (this.capabilities.initialize) {
      await this.connection.write(
        Buffer.from(this.capabilities.initialize, 'ascii'),
      );
    }
    return this.fontChanged(this.font, this.font);
  }

  protected async fontChanged(current: Font, previows: Font) {
    await super.fontChanged(current, previows);
    return this.applyCodePage();
  }

  async qrcode(data: string, size: number) {
    const len = data.length + 2;
    const pL = String.fromCharCode(len & 0xff);
    const pH = String.fromCharCode((len >> 8) & 0xff);
    const error = 'M';
    const _size = String.fromCharCode(Math.min(7, Math.max(3, size || 4)));
    await this.connection.write(Buffer.from('\x1B\x81', 'ascii'));
    await this.connection.write(Buffer.from(pL + pH, 'ascii'));
    await this.connection.write(Buffer.from(_size + error, 'ascii'));
    return this.connection.write(Buffer.from(data, 'ascii'));
  }

  protected get bitmapCmd(): string {
    return '\x1B*m';
  }
}
