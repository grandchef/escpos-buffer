import Model from './Model';
import { Connection } from './connection';
import Image from './graphics/Image';
import { StyleConf } from './profile';

export enum Align {
  Left,
  Center,
  Right,
}

export enum Style {
  Bold = 1,
  Italic = 2,
  Underline = 4,
  Condensed = 8,
  DoubleWidth = 16,
  DoubleHeight = 32,
}

export enum Cut {
  Full,
  Partial,
}

export enum Drawer {
  First,
  Second,
}

export default class Printer {
  private model: Model;

  static async connectPrinter(
    model: Model,
    connection: Connection,
  ): Promise<Printer> {
    await connection.open();
    const printer = new Printer(model, connection);
    await model.profile.initialize();
    return printer;
  }

  constructor(model: Model, connection: Connection) {
    this.model = model;
    this.model.profile.connection = connection;
  }

  async setCodepage(value: string) {
    return this.model.profile.setCodepage(value);
  }

  async buzzer() {
    return this.model.profile.buzzer();
  }

  async cutter(mode: Cut = Cut.Partial) {
    return this.model.profile.cutter(mode);
  }

  /**
   * @param number drawer id
   * @param on_time time in milliseconds that activate the drawer
   * @param off_time time in milliseconds that deactivate the drawer
   */
  async drawer(
    number: Drawer = Drawer.First,
    on_time: number = 120,
    off_time: number = 240,
  ) {
    return this.model.profile.drawer(number, on_time, off_time);
  }

  async draw(image: Image): Promise<void> {
    return this.model.profile.draw(image);
  }

  async qrcode(data: string, size: number = null): Promise<void> {
    return this.model.profile.qrcode(data, size);
  }

  async setAlignment(align: Align): Promise<void> {
    return this.model.profile.setAlignment(align);
  }

  async write(text: string, styles: number = 0): Promise<void> {
    return this.model.profile.write(text, styles);
  }

  async writeln(
    text: string = '',
    styles: number = 0,
    align: Align = Align.Left,
  ) {
    return this.model.profile.writeln(text, styles, align);
  }

  async withStyle(styleConf: StyleConf, cb: Function) {
    return this.model.profile.withStyle(styleConf, cb);
  }

  async feed(lines: number = 1) {
    return this.model.profile.feed(lines);
  }

  get columns(): number {
    return this.model.profile.columns;
  }

  set columns(value: number) {
    this.model.profile.columns = value;
  }

  async close() {
    return this.model.profile.finalize();
  }
}
