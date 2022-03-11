import Model from './Model';
import { Connection } from './connection';
import Image from './graphics/Image';
import { StyleConf } from './profile';
import { Cut, Drawer, Align } from './actions';
import { SupportedModel } from './capabilities';

export default class Printer {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
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

  async setColumns(value: number) {
    return this.model.profile.setColumns(value);
  }

  async close() {
    return this.model.profile.finalize();
  }

  static async CONNECT(
    _model: SupportedModel | Model,
    connection: Connection,
  ): Promise<Printer> {
    let model: Model;
    if (typeof _model === 'string') {
      model = new Model(_model);
    } else {
      model = _model;
    }
    await connection.open();
    model.profile.connection = connection;
    await model.profile.initialize?.();
    return new Printer(model);
  }
}
