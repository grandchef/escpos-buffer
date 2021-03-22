import Epson from './Epson';
import { Drawer, Style, Cut } from '../Printer';

export default class Elgin extends Epson {
  cutter(mode: Cut): void {
    if (this.capabilities.model == 'I9') {
      return this.connection.write(Buffer.from('\x1DV0', 'ascii'));
    }
    super.cutter(mode);
  }

  buzzer(): void {
    this.connection.write(Buffer.from('\x1B(A\x05\x00ad\x02\x02\x01', 'ascii'));
  }

  drawer(number: Drawer, on_time: number, off_time: number): void {
    if (this.capabilities.model.startsWith('I')) {
      return super.drawer(number, on_time, off_time);
    }
    const index = {
      [Drawer.First]: 'v',
      [Drawer.Second]: 'v',
    };
    const on_time_char = String.fromCharCode(
      Math.max(Math.min(on_time, 200), 50),
    );
    this.connection.write(
      Buffer.from('\x1B' + index[number] + on_time_char, 'ascii'),
    );
  }

  protected setStyle(style: Style, enable: boolean): void {
    if (this.capabilities.model == 'I9') {
      return super.setStyle(style, enable);
    }
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
    if (this.capabilities.model == 'I9') {
      return super.setMode(mode, enable);
    }
    if (enable) {
      if (mode & Style.DoubleWidth) {
        this.connection.write(Buffer.from('\x1BW\x01', 'ascii'));
      }
      if (mode & Style.DoubleHeight) {
        this.connection.write(Buffer.from('\x1Bd\x01', 'ascii'));
      }
    } else {
      if (mode & Style.DoubleHeight) {
        this.connection.write(Buffer.from('\x1Bd\x00', 'ascii'));
      }
      if (mode & Style.DoubleWidth) {
        this.connection.write(Buffer.from('\x1BW\x00', 'ascii'));
      }
    }
  }

  async qrcode(data: string, size: number) {
    if (this.capabilities.model == 'I9') {
      return super.qrcode(data, size);
    }
    const type = String.fromCharCode(2);
    const error = 'M';
    const _size = String.fromCharCode(Math.min(255, Math.max(1, size || 4)));
    this.connection.write(
      Buffer.from('\x1Do\x00' + _size + '\x00' + type, 'ascii'),
    );
    this.connection.write(Buffer.from('\x1Dk\x0B' + error + 'A,', 'ascii'));
    this.connection.write(Buffer.from(data, 'ascii'));
    this.connection.write(Buffer.from('\x00', 'ascii'));
  }
}
