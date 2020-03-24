import Model from '../../src/Model';
import InMemory from '../../src/connection/InMemory';
import Printer, { Align, Style } from '../../src/Printer';
import { load } from '../helper';

describe('epson model profile', () => {
  it('write text from model TM-T20', () => {
    const connection = new InMemory();
    const model = new Model('TM-T20');
    const printer = new Printer(model, connection);
    printer.writeln('Large Text');
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_text', connection.buffer()),
    );
  });

  it('write text with double width and height from model TM-T20', () => {
    const connection = new InMemory();
    const model = new Model('TM-T20');
    const printer = new Printer(model, connection);
    printer.columns = 64;
    printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    printer.feed(2);
    printer.feed(255);
    expect(model.profile.font.name).toBe('Font B');
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_large_text_font', connection.buffer()),
    );
  });

  it('draw qrcode from model TM-T20', async () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    printer.alignment = Align.Center;
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    printer.alignment = Align.Left;
    expect(connection.buffer()).toStrictEqual(
      load('tm-t20_qrcode', connection.buffer()),
    );
  });

  it('sets char size from the style and clears it after', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    const cb = jest.fn();
    const width = 4;
    const height = 6;
    printer.withStyle({ width, height }, cb);
    const expectedN = (height - 1) | ((width - 1) << 4);

    const buffer = connection.buffer();
    const setCharSizeCmd = [...buffer.slice(3, 6)];
    const clearCharSizeCmd = [...buffer.slice(6, 9)];
    expect(setCharSizeCmd).toEqual([0x1d, 0x21, expectedN]);
    expect(clearCharSizeCmd).toEqual([0x1d, 0x21, 0x00]);
  });

  it('defaults width to 1', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    const cb = jest.fn();
    const height = 6;
    printer.withStyle({ height }, cb);

    const expectedWidth = 1;
    const expectedN = (height - 1) | ((expectedWidth - 1) << 4);
    const buffer = connection.buffer();
    expect(buffer[5]).toBe(expectedN);
  });

  it('defaults height to 1', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    const cb = jest.fn();
    const width = 6;
    printer.withStyle({ width }, cb);

    const expectedHeight = 1;
    const expectedN = (expectedHeight - 1) | ((width - 1) << 4);
    const buffer = connection.buffer();
    expect(buffer[5]).toBe(expectedN);
  });

  it('caps max char size at 8', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    const cb = jest.fn();
    printer.withStyle(
      {
        width: 15,
        height: 10,
      },
      cb,
    );

    const expectedHeight = 8;
    const expectedWidth = 8;
    const expectedN = (expectedHeight - 1) | ((expectedWidth - 1) << 4);
    const buffer = connection.buffer();
    expect(buffer[5]).toBe(expectedN);
  });

  it('caps min char size at 1', () => {
    const connection = new InMemory();
    const printer = new Printer(new Model('TM-T20'), connection);
    const cb = jest.fn();
    printer.withStyle(
      {
        width: -1,
        height: -1,
      },
      cb,
    );

    const expectedN = 0;
    const buffer = connection.buffer();
    expect(buffer[5]).toBe(expectedN);
  });
});
