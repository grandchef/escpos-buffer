import { Connection } from '../connection';
import { Font, Capability, CodePage } from '../capabilities';
import { Align, Style, Cut, Drawer } from '../actions';
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
  }

  abstract feed(lines: number): Promise<void>;

  abstract cutter(mode: Cut): Promise<void>;

  abstract buzzer(): Promise<void>;

  /**
   * @param number drawer id
   * @param on_time time in milliseconds that activate the drawer
   * @param off_time time in milliseconds that deactivate the drawer
   */
  abstract drawer(
    number: Drawer,
    on_time: number,
    off_time: number,
  ): Promise<void>;

  abstract setAlignment(align: Align): Promise<void>;

  abstract qrcode(data: string, size: number): Promise<void>;

  protected abstract setMode(mode: number, enable: boolean): Promise<void>;

  protected abstract setStyle(style: Style, enable: boolean): Promise<void>;

  protected abstract setCharSize(charSize: {
    width: number;
    height: number;
  }): Promise<void>;

  protected async setStyles(styles: number, enable: boolean): Promise<void> {
    let properties = [
      Style.Condensed,
      Style.Bold,
      Style.Italic,
      Style.Underline,
    ];
    properties = enable ? properties : properties.reverse();
    for (const style of properties) {
      await this.setStyle(style & styles, enable);
    }
  }

  async write(text: string, styles: number): Promise<void> {
    await this.setMode(styles, true);
    await this.setStyles(styles, true);
    await this.connection.write(iconv.encode(text, this._codepage.code));
    await this.setStyles(styles, false);
    return this.setMode(styles, false);
  }

  async withStyle(styleConf: StyleConf, cb: Function): Promise<void> {
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
      await this.setAlignment(align);
    }
    await this.setCharSize({ width, height });
    await this.setStyles(styles, true);
    cb();
    await this.setStyles(styles, false);
    await this.setCharSize({ width: 1, height: 1 });
    if (align !== Align.Left) {
      await this.setAlignment(Align.Left);
    }
  }

  async writeln(text: string, styles: number, align: Align): Promise<void> {
    // apply other alignment
    if (align !== Align.Left) {
      await this.setAlignment(align);
    }
    if (text.length > 0) {
      await this.write(text, styles);
    }
    await this.feed(1);
    // reset align to left
    if (align !== Align.Left) {
      return this.setAlignment(Align.Left);
    }
  }

  protected get bitmapCmd(): string {
    return '\x1B*!';
  }

  async draw(image: Image): Promise<void> {
    const low = String.fromCharCode(image.width & 0xff);
    const high = String.fromCharCode((image.width >> 8) & 0xff);
    await this.connection.write(Buffer.from('\x1B3\x10', 'ascii'));
    for (let y = 0; y < image.lines; y++) {
      const data = image.lineData(y);
      await this.connection.write(
        Buffer.from(this.bitmapCmd + low + high, 'ascii'),
      );
      await this.connection.write(data);
      await this.connection.write(Buffer.from('\x1BJ\x00', 'ascii'));
    }
    return this.connection.write(Buffer.from('\x1B2', 'ascii'));
  }

  protected async drawQrcode(data: string, size: number): Promise<void> {
    const buffer = await QRCode.toBuffer(data, { scale: size });
    const image = new Image(buffer, new Threshold());
    return this.draw(image);
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

  async setColumns(value: number) {
    const font = this.fonts.find(({ columns }: Font) => columns >= value);
    await this.setFont(font || this.fonts.slice(-1)[0]);
    this._columns = this.font.columns >= value ? value : this.font.columns;
  }

  async setFont(value: Font) {
    const old = this._font;
    this._font = value;
    if (old && old.name != value.name) {
      await this.fontChanged(value, old);
      return this.applyCodePage();
    }
  }

  get font(): Font {
    return this._font;
  }

  get fonts(): Font[] {
    return this.capabilities.fonts;
  }

  async setCodepage(value: string) {
    const old = this._codepage;
    const codepage = this.capabilities.codepages.find(
      ({ code }: CodePage) => value == code,
    );
    if (codepage === undefined) {
      throw new Error(`Unsupported codepage "${value}"`);
    }
    this._codepage = codepage;
    if (old && old.code != codepage.code) {
      await this.applyCodePage();
    }
  }

  protected async applyCodePage(): Promise<void> {
    return this.connection.write(Buffer.from(this._codepage.command, 'ascii'));
  }

  protected async fontChanged(_: Font, __: Font) {}

  async initialize(): Promise<void> {
    await this.setCodepage(this.capabilities.codepage);
    await this.setColumns(this.capabilities.columns);
    if (this.capabilities.initialize) {
      await this.connection.write(
        Buffer.from(this.capabilities.initialize, 'ascii'),
      );
    }
    return this.applyCodePage();
  }

  async finalize(): Promise<void> {
    return this.connection.close();
  }
}
