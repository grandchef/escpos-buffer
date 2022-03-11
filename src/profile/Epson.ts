import { Align, Style, Cut, Drawer } from '../actions';
import { Profile } from '.';
import { Font } from '../capabilities';

export default class Epson extends Profile {
  async feed(lines: number): Promise<void> {
    if (lines > 1) {
      const count = Math.trunc(lines / 255);
      let cmd = ('\x1Bd' + String.fromCharCode(Math.min(lines, 255))).repeat(
        count,
      );
      const remaining = lines - count * 255;
      if (remaining > 0) {
        cmd += '\x1Bd' + String.fromCharCode(remaining);
      }
      return this.connection.write(Buffer.from(cmd));
    } else {
      return this.connection.write(Buffer.from('\r\n', 'ascii'));
    }
  }

  async cutter(_: Cut): Promise<void> {
    return this.connection.write(Buffer.from('\x1Bm', 'ascii'));
  }

  async buzzer(): Promise<void> {
    return this.connection.write(Buffer.from('\x07', 'ascii'));
  }

  async drawer(
    number: Drawer,
    on_time: number,
    off_time: number,
  ): Promise<void> {
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
    return this.connection.write(
      Buffer.from('\x1Bp' + index_char + on_time_char + off_time_char, 'ascii'),
    );
  }

  async setAlignment(align: Align) {
    const cmd = {
      [Align.Left]: '\x1Ba0',
      [Align.Center]: '\x1Ba1',
      [Align.Right]: '\x1Ba2',
    };
    return this.connection.write(Buffer.from(cmd[align], 'ascii'));
  }

  protected async setMode(mode: number, enable: boolean): Promise<void> {
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
      return this.connection.write(
        Buffer.from('\x1B!' + String.fromCharCode(byte & mask), 'ascii'),
      );
    }
  }

  protected async setStyle(style: Style, enable: boolean): Promise<void> {
    if (enable) {
      // enable styles
      if (Style.Condensed == style) {
        return this.connection.write(Buffer.from('\x1B\x0f', 'ascii'));
      } else if (Style.Bold == style) {
        return this.connection.write(Buffer.from('\x1BE1', 'ascii'));
      } else if (Style.Italic == style) {
        return this.connection.write(Buffer.from('\x1B4', 'ascii'));
      } else if (Style.Underline == style) {
        return this.connection.write(Buffer.from('\x1B-1', 'ascii'));
      }
    } else {
      // disable styles
      if (Style.Underline == style) {
        return this.connection.write(Buffer.from('\x1B-0', 'ascii'));
      } else if (Style.Italic == style) {
        return this.connection.write(Buffer.from('\x1B5', 'ascii'));
      } else if (Style.Bold == style) {
        return this.connection.write(Buffer.from('\x1BE0', 'ascii'));
      } else if (Style.Condensed == style) {
        return this.connection.write(Buffer.from('\x12', 'ascii'));
      }
    }
  }

  protected async setCharSize({
    width = 1,
    height = 1,
  }: {
    width: number;
    height: number;
  }) {
    width = Math.max(1, Math.min(width, 8));
    height = Math.max(1, Math.min(height, 8));
    const n = (height - 1) | ((width - 1) << 4);

    return this.connection.write(
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
    await this.connection.write(
      Buffer.from('\x1D(k\x04\x001A' + tipo + '\x00', 'ascii'),
    );
    await this.connection.write(
      Buffer.from('\x1D(k\x03\x001C' + _size, 'ascii'),
    );
    await this.connection.write(
      Buffer.from('\x1D(k\x03\x001E' + error, 'ascii'),
    );
    await this.connection.write(
      Buffer.from('\x1D(k' + pL + pH + '1P0', 'ascii'),
    );
    await this.connection.write(Buffer.from(data, 'ascii'));
    return this.connection.write(Buffer.from('\x1D(k\x03\x001Q0', 'ascii'));
  }

  protected async fontChanged(current: Font, previows: Font) {
    if (current.name == 'Font A') {
      await this.connection.write(Buffer.from('\x1BM\x00', 'ascii'));
    } else {
      // Font B
      await this.connection.write(Buffer.from('\x1BM\x01', 'ascii'));
    }
    return super.fontChanged(current, previows);
  }
}
