import { Align, Style, Drawer, Cut } from '../Printer';
import { Profile } from '.';
import { Font } from '../capabilities';

export default class Epson extends Profile {
  feed(lines: number): void {
    if (lines > 1) {
      const count = Math.trunc(lines / 255);
      let cmd = ('\x1Bd' + String.fromCharCode(Math.min(lines, 255))).repeat(
        count,
      );
      const remaining = lines - count * 255;
      if (remaining > 0) {
        cmd += '\x1Bd' + String.fromCharCode(remaining);
      }
      this.connection.write(Buffer.from(cmd));
    } else {
      this.connection.write(Buffer.from('\r\n', 'ascii'));
    }
  }

  cutter(_: Cut): void {
    this.connection.write(Buffer.from('\x1Bm', 'ascii'));
  }

  buzzer(): void {
    this.connection.write(Buffer.from('\x07', 'ascii'));
  }

  drawer(number: Drawer, on_time: number, off_time: number): void {
    const index = {
      [Drawer.First]: 0,
      [Drawer.Second]: 1,
    };
    const on_time_char = String.fromCharCode(
      Math.min(Math.trunc(on_time / 2), 255),
    );
    const off_time_char = String.fromCharCode(
      Math.min(Math.trunc(off_time / 2), 255),
    );
    const index_char = String.fromCharCode(index[number]);
    this.connection.write(
      Buffer.from('\x1Bp' + index_char + on_time_char + off_time_char, 'ascii'),
    );
  }

  set alignment(align: Align) {
    const cmd = {
      [Align.Left]: '\x1Ba0',
      [Align.Center]: '\x1Ba1',
      [Align.Right]: '\x1Ba2',
    };
    this.connection.write(Buffer.from(cmd[align], 'ascii'));
  }

  protected setMode(mode: number, enable: boolean): void {
    let byte = 0b00000000; // keep Font A selected
    if (this.font.name == 'Font B') {
      byte |= 0b00000001; // keep Font B selected
    }
    const before = byte;
    if (Style.DoubleHeight & mode) {
      byte |= 0b00010000;
    }
    if (Style.DoubleWidth & mode) {
      byte |= 0b00100000;
    }
    let mask = 0b00000001;
    if (enable) {
      mask = 0b00110001;
    }
    if (before != byte) {
      this.connection.write(
        Buffer.from('\x1B!' + String.fromCharCode(byte & mask), 'ascii'),
      );
    }
  }

  protected setStyle(style: Style, enable: boolean): void {
    if (enable) {
      // enable styles
      if (Style.Condensed == style) {
        this.connection.write(Buffer.from('\x1B\x0f', 'ascii'));
      } else if (Style.Bold == style) {
        this.connection.write(Buffer.from('\x1BE1', 'ascii'));
      } else if (Style.Italic == style) {
        this.connection.write(Buffer.from('\x1B4', 'ascii'));
      } else if (Style.Underline == style) {
        this.connection.write(Buffer.from('\x1B-1', 'ascii'));
      }
    } else {
      // disable styles
      if (Style.Underline == style) {
        this.connection.write(Buffer.from('\x1B-0', 'ascii'));
      } else if (Style.Italic == style) {
        this.connection.write(Buffer.from('\x1B5', 'ascii'));
      } else if (Style.Bold == style) {
        this.connection.write(Buffer.from('\x1BE0', 'ascii'));
      } else if (Style.Condensed == style) {
        this.connection.write(Buffer.from('\x12', 'ascii'));
      }
    }
  }

  protected setCharSize({
    width = 1,
    height = 1,
  }: {
    width: number;
    height: number;
  }) {
    width = Math.max(1, Math.min(width, 8));
    height = Math.max(1, Math.min(height, 8));
    const n = (height - 1) | ((width - 1) << 4);

    this.connection.write(
      Buffer.from(`\x1D!${String.fromCharCode(n)}`, 'ascii'),
    );
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

  protected fontChanged(current: Font, previows: Font) {
    if (current.name == 'Font A') {
      this.connection.write(Buffer.from('\x1BM\x00', 'ascii'));
    } else {
      // Font B
      this.connection.write(Buffer.from('\x1BM\x01', 'ascii'));
    }
    super.fontChanged(current, previows);
  }
}
