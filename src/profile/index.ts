import { Connection } from '../connection';
import { Font, Capability, CodePage } from '../capabilities';
import { Align, Drawer, Style, Cut } from '../Printer';
import * as iconv from 'iconv-lite';
import * as QRCode from 'qrcode';
import Image from '../graphics/Image';
import { Threshold } from '../graphics/filter';

export type StyleConf = {
  width?: number;
  height?: number;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  align?: Align;
};

export abstract class Profile {
  private _columns: number;
  private _codepage: CodePage;
  private _font: Font;
  private _connection: Connection;
  protected capabilities: Capability;

  constructor(capabilities: Capability) {
    this.capabilities = capabilities;
    this.columns = this.defaultColumns;
    this.codepage = this.capabilities.codepage;
  }

  abstract feed(lines: number): void;

  abstract cutter(mode: Cut): void;

  abstract buzzer(): void;

  /**
   * @param number drawer id
   * @param on_time time in milliseconds that activate the drawer
   * @param off_time time in milliseconds that deactivate the drawer
   */
  abstract drawer(number: Drawer, on_time: number, off_time: number): void;

  abstract set alignment(align: Align);

  abstract async qrcode(data: string, size: number): Promise<void>;

  protected abstract setMode(mode: number, enable: boolean): void;

  protected abstract setStyle(style: Style, enable: boolean): void;

  protected abstract setCharSize(charSize: {
    width: number;
    height: number;
  }): void;

  protected setStyles(styles: number, enable: boolean) {
    let properties = [
      Style.Condensed,
      Style.Bold,
      Style.Italic,
      Style.Underline,
    ];
    properties = enable ? properties : properties.reverse();
    properties.forEach((style: Style) => {
      this.setStyle(style & styles, enable);
    });
  }

  write(text: string, styles: number) {
    this.setMode(styles, true);
    this.setStyles(styles, true);
    this.connection.write(iconv.encode(text, this._codepage.code));
    this.setStyles(styles, false);
    this.setMode(styles, false);
  }

  withStyle(styleConf: StyleConf, cb: Function) {
    const {
      width = undefined,
      height = undefined,
      bold = false,
      italic = false,
      underline = false,
      align = Align.Left,
    } = styleConf;
    let styles = 0;
    if (bold) styles |= Style.Bold;
    if (italic) styles |= Style.Italic;
    if (underline) styles |= Style.Underline;

    if (align !== Align.Left) {
      this.alignment = align;
    }
    this.setCharSize({ width, height });
    this.setStyles(styles, true);
    cb();
    this.setStyles(styles, false);
    this.setCharSize({ width: 1, height: 1 });
    if (align !== Align.Left) {
      this.alignment = Align.Left;
    }
  }

  writeln(text: string, styles: number, align: Align) {
    // apply other alignment
    if (align !== Align.Left) {
      this.alignment = align;
    }
    if (text.length > 0) {
      this.write(text, styles);
    }
    this.feed(1);
    // reset align to left
    if (align !== Align.Left) {
      this.alignment = Align.Left;
    }
  }

  protected get bitmapCmd(): string {
    return '\x1B*!';
  }

  draw(image: Image) {
    const low = String.fromCharCode(image.width & 0xff);
    const high = String.fromCharCode((image.width >> 8) & 0xff);
    this.connection.write(Buffer.from('\x1B3\x10', 'ascii'));
    for (let y = 0; y < image.lines; y++) {
      const data = image.lineData(y);
      this.connection.write(Buffer.from(this.bitmapCmd + low + high, 'ascii'));
      this.connection.write(data);
      this.connection.write(Buffer.from('\x1BJ\x00', 'ascii'));
    }
    this.connection.write(Buffer.from('\x1B2', 'ascii'));
  }

  protected async drawQrcode(data: string, size: number): Promise<void> {
    const buffer = await QRCode.toBuffer(data, { scale: size });
    const image = new Image(buffer, new Threshold());
    this.draw(image);
  }

  get connection(): Connection {
    if (this._connection) {
      return this._connection;
    }
    throw new Error('Connection must be set before priting');
  }

  set connection(value: Connection) {
    this._connection = value;
  }

  get name(): string {
    return this.capabilities.brand + ' ' + this.capabilities.model;
  }

  get columns(): number {
    return this._columns;
  }

  set columns(value: number) {
    const font = this.fonts.find(({ columns }: Font) => columns >= value);
    this.font = font || this.fonts.slice(-1)[0];
    this._columns = this.font.columns >= value ? value : this.font.columns;
  }

  get defaultColumns(): number {
    return this.capabilities.columns;
  }

  set font(value: Font) {
    const old = this._font;
    this._font = value;
    if (old && old.name != value.name) {
      this.fontChanged(value, old);
      this.applyCodePage();
    }
  }

  get font(): Font {
    return this._font;
  }

  get fonts(): Font[] {
    return this.capabilities.fonts;
  }

  set codepage(value: string) {
    const old = this._codepage;
    const codepage = this.capabilities.codepages.find(
      ({ code }: CodePage) => value == code,
    );
    if (codepage === undefined) {
      throw new Error(`Unsupported codepage "${value}"`);
    }
    this._codepage = codepage;
    if (old && old.code != codepage.code) {
      this.applyCodePage();
    }
  }

  protected applyCodePage() {
    this.connection.write(Buffer.from(this._codepage.command, 'ascii'));
  }

  protected fontChanged(_: Font, __: Font) {}

  initialize() {
    if (this.capabilities.initialize) {
      this.connection.write(Buffer.from(this.capabilities.initialize, 'ascii'));
    }
    this.applyCodePage();
  }

  finalize() {
    this.connection.close();
  }
}
