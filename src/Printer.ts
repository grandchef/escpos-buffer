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

  constructor(model: Model, connection: Connection) {
    connection.open();
    this.model = model;
    this.model.profile.connection = connection;
    this.model.profile.initialize();
  }

  set codepage(value: string) {
    this.model.profile.codepage = value;
  }

  buzzer() {
    this.model.profile.buzzer();
  }

  cutter(mode: Cut = Cut.Partial) {
    this.model.profile.cutter(mode);
  }

  /**
   * @param number drawer id
   * @param on_time time in milliseconds that activate the drawer
   * @param off_time time in milliseconds that deactivate the drawer
   */
  drawer(
    number: Drawer = Drawer.First,
    on_time: number = 120,
    off_time: number = 240,
  ) {
    this.model.profile.drawer(number, on_time, off_time);
  }

  draw(image: Image) {
    this.model.profile.draw(image);
  }

  async qrcode(data: string, size: number = null) {
    await this.model.profile.qrcode(data, size);
  }

  set alignment(align: Align) {
    this.model.profile.alignment = align;
  }

  write(text: string, styles: number = 0) {
    this.model.profile.write(text, styles);
  }

  writeln(text: string = '', styles: number = 0, align: Align = Align.Left) {
    this.model.profile.writeln(text, styles, align);
  }

  withStyle(styleConf: StyleConf, cb: Function) {
    this.model.profile.withStyle(styleConf, cb);
  }

  feed(lines: number = 1) {
    this.model.profile.feed(lines);
  }

  get columns(): number {
    return this.model.profile.columns;
  }

  set columns(value: number) {
    this.model.profile.columns = value;
  }

  close() {
    this.model.profile.finalize();
  }
}
