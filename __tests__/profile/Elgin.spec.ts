import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { Align, Style, Cut } from '../../src/actions';
import { load } from '../helper';

describe('elgin model profile', () => {
  it('write bold text from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.writeln('Bold text', Style.Bold, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('i9_bold_text', connection.buffer()),
    );
  });

  it('write text with double width and height from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('i9_large_text', connection.buffer()),
    );
  });

  it('draw qrcode from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.setAlignment(Align.Center);
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    await printer.setAlignment(Align.Left);
    expect(connection.buffer()).toStrictEqual(
      load('i9_qrcode', connection.buffer()),
    );
  });

  it('emit buzzer from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('i9_buzzer', connection.buffer()),
    );
  });

  it('activate drawer from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('i9_drawer', connection.buffer()),
    );
  });

  it('activate drawer from model VOX', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('VOX', connection);
    await printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('vox_drawer', connection.buffer()),
    );
  });

  it('activate drawer from model I7', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I7', connection);
    printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('i7_drawer', connection.buffer()),
    );
  });

  it('cut paper partially from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.writeln('Cut below', 0, Align.Center);
    await printer.cutter();
    expect(connection.buffer()).toStrictEqual(
      load('i9_cutter', connection.buffer()),
    );
  });

  it('cut entire paper from model I9', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('I9', connection);
    await printer.writeln('Cut below', 0, Align.Center);
    await printer.cutter(Cut.Full);
    expect(connection.buffer()).toStrictEqual(
      load('i9_cutter_full', connection.buffer()),
    );
  });

  it('cut paper partially from model VOX', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('VOX', connection);
    await printer.writeln('Cut below', 0, Align.Center);
    await printer.cutter();
    expect(connection.buffer()).toStrictEqual(
      load('vox_cutter', connection.buffer()),
    );
  });

  it('write bold text from model VOX', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('VOX', connection);
    await printer.writeln('Bold text', Style.Bold, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('vox_bold_text', connection.buffer()),
    );
  });

  it('write text with double width and height from model VOX', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('VOX', connection);
    await printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('vox_large_text', connection.buffer()),
    );
  });

  it('draw qrcode from model VOX', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('VOX', connection);
    await printer.setAlignment(Align.Center);
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    await printer.setAlignment(Align.Left);
    expect(connection.buffer()).toStrictEqual(
      load('vox_qrcode', connection.buffer()),
    );
  });
});
