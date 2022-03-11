import Epson from './Epson';
import { Style, Drawer } from '../actions';
import { Font } from '../capabilities';

export default class Bematech extends Epson {
  protected async setStyle(style: Style, enable: boolean): Promise<void> {
    if (this.font.name != 'Font C') {
      return super.setStyle(style, enable);
    }
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

  async buzzer(): Promise<void> {
    if (this.capabilities.model == 'MP-2800 TH') {
      return this.connection.write(Buffer.from('\x1BB\x02\x01', 'ascii'));
    } else if (this.font.name != 'Font C') {
      return this.connection.write(
        Buffer.from('\x1B(A\x05\x00ad\x02\x02\x01', 'ascii'),
      );
    } else {
      return super.buzzer();
    }
  }

  async drawer(
    number: Drawer,
    on_time: number,
    off_time: number,
  ): Promise<void> {
    if (this.font.name != 'Font C') {
      return super.drawer(number, on_time, off_time);
    }
    const index = {
      [Drawer.First]: 'v',
      [Drawer.Second]: '\x80',
    };
    const on_time_char = String.fromCharCode(
      Math.max(Math.min(on_time, 255), 50),
    );
    return this.connection.write(
      Buffer.from('\x1B' + index[number] + on_time_char, 'ascii'),
    );
  }

  async qrcode(data: string, size: number) {
    const len = data.length + 3;
    const pL = String.fromCharCode(len & 0xff);
    const pH = String.fromCharCode((len >> 8) & 0xff);
    const error = String.fromCharCode(2);
    const _size = String.fromCharCode(Math.min(11, Math.max(1, size || 4)) * 2);
    const version = String.fromCharCode(0);
    const encoding = String.fromCharCode(1);
    await this.connection.write(Buffer.from('\x1DkQ', 'ascii'));
    await this.connection.write(
      Buffer.from(error + _size + version + encoding, 'ascii'),
    );
    await this.connection.write(Buffer.from(pL + pH, 'ascii'));
    await this.connection.write(Buffer.from(data, 'ascii'));
    await this.connection.write(Buffer.from('\x00', 'ascii'));
    return this.feed(1);
  }

  protected async fontChanged(current: Font, previows: Font): Promise<void> {
    if (current.name == 'Font C') {
      return this.connection.write(Buffer.from('\x1D\xf950', 'ascii'));
    }
    await this.connection.write(Buffer.from('\x1D\xf951', 'ascii'));
    return super.fontChanged(current, previows);
  }
}
