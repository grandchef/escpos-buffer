import Epson from './Epson';

export default class TecToy extends Epson {
  async feed(lines: number): Promise<void> {
    return this.connection.write(Buffer.from('\x0A'.repeat(lines), 'ascii'));
  }

  async buzzer(): Promise<void> {
    const n = String.fromCharCode(1); // n of buzzes
    return this.connection.write(Buffer.from('\x1BB' + n + '\x03', 'ascii'));
  }

  async qrcode(data: string, size: number) {
    const _size = String.fromCharCode(size || 4);
    const error = '0';
    const len = data.length + 3;
    const pL = String.fromCharCode(len & 0xff);
    const pH = String.fromCharCode((len >> 8) & 0xff);

    await this.connection.write(
      Buffer.from('\x1D(k\x04\x001A\x00\x00', 'ascii'),
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
    await this.connection.write(Buffer.from('\x1D(k\x03\x001Q0', 'ascii'));

    // line feed
    return this.connection.write(Buffer.from('\x0A'));
  }
}
