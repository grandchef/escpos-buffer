import * as path from 'path';
import { Image } from '../src';
import { Capability } from '../src/capabilities';
import InMemory from '../src/connection/InMemory';
import Model from '../src/Model';
import Printer, { Align, Style } from '../src/Printer';
import { StyleConf } from '../src/profile';
import Elgin from '../src/profile/Elgin';
import { load } from './helper';

describe('print formatted text', () => {
  it('write text', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.write('Simple Text');
    printer.feed();
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_write_text', connection.buffer()),
    );
  });

  it('write line', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln('Simple Line');
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_write_line', connection.buffer()),
    );
  });

  it('write empty line', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln();
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_write_empty_line', connection.buffer()),
    );
  });

  it('write bold text', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln('Bold text', Style.Bold, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_bold_text', connection.buffer()),
    );
  });

  it('write text with double width and height', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_large_text', connection.buffer()),
    );
  });

  it('write italic text', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln('Italic Text', Style.Italic, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_italic_text', connection.buffer()),
    );
  });

  it('write underline text', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln('Underline Text', Style.Underline, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_underline_text', connection.buffer()),
    );
  });

  it('write condensed text', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.writeln('Condensed Text', Style.Condensed, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_condensed_text', connection.buffer()),
    );
  });

  it('draw qrcode', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('MP-4200 TH'), connection);
    printer.alignment = Align.Center;
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    printer.alignment = Align.Left;
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_qrcode', connection.buffer()),
    );
  });

  it('emit buzzer', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_buzzer', connection.buffer()),
    );
  });

  it('activate drawer', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_drawer', connection.buffer()),
    );
  });

  it('cut paper', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.cutter();
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_cut', connection.buffer()),
    );
  });

  it('draw picture from file', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('MP-4200 TH'), connection);
    const image = new Image(path.join(__dirname, 'resources/sample.png'));
    printer.alignment = Align.Center;
    printer.draw(image);
    printer.alignment = Align.Left;
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_draw_file', connection.buffer()),
    );
  });

  it('draw picture from buffer', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('MP-4200 TH'), connection);
    const image = new Image(load('sample.png'));
    printer.alignment = Align.Center;
    printer.draw(image);
    printer.alignment = Align.Left;
    printer.close();
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_draw_buffer', connection.buffer()),
    );
  });

  it('custom capability', async () => {
    const capability: Capability = {
      columns: 42,
      profile: 'epson',
      model: 'A123',
      brand: 'Custom',
      codepage: 'utf8',
      codepages: [
        {
          code: 'utf8',
          command: '',
        },
      ],
      fonts: [
        {
          name: 'Font A',
          columns: 42,
        },
      ],
    };
    const profile = new Elgin(capability);
    const model = new Model(profile);
    expect(model.profile.font.name).toBe('Font A');
  });

  it('check default columns', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('MP-4200 TH'), connection);
    const capability = Model.ALL().find(
      ({ model }: Capability) => model == 'MP-4200 TH',
    );
    expect(printer.columns).toBe(capability.columns);
  });

  it('change columns', async () => {
    const connection = new InMemory();
    const model = new Model('MP-4200 TH');
    const printer = new Printer(model, connection);
    printer.columns = 42;
    expect(model.profile.font.name).toBe('Font A');
  });

  it('overflow columns', async () => {
    const connection = new InMemory();
    const model = new Model('MP-4200 TH');
    const printer = new Printer(model, connection);
    printer.columns = 62;
    expect(model.profile.font.name).toBe('Font B');
    expect(printer.columns).toBe(56);
  });

  it('change codepage', async () => {
    const connection = new InMemory();
    const model = new Model('MP-4200 TH');
    const printer = new Printer(model, connection);
    printer.codepage = 'utf8';
    printer.writeln('Açênts');
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_utf8_text', connection.buffer()),
    );
  });

  it('unsupported model', async () => {
    expect(() => {
      new Model('Unknow Model');
    }).toThrow();
  });

  it('unsupported codepage', async () => {
    expect(() => {
      const connection = new InMemory();
      const model = new Model('MP-4200 TH');
      const printer = new Printer(model, connection);
      printer.codepage = 'utf9';
    }).toThrow();
  });

  it('write without connection', async () => {
    expect(() => {
      const model = new Model('MP-4200 TH');
      model.profile.feed(1);
    }).toThrow();
  });

  it('should forward withStyle to the profile', () => {
    const connection = new InMemory();
    const model = new Model('MP-4200 TH');
    const withStyleSpy = jest
      .spyOn(model.profile, 'withStyle')
      .mockImplementation((_: StyleConf, cb: Function) => cb());
    const printer = new Printer(model, connection);

    const styleConf = {
      width: 4,
      height: 8,
    };
    const cb = jest.fn();
    printer.withStyle(styleConf, cb);

    expect(withStyleSpy).toHaveBeenCalledWith(styleConf, cb);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
