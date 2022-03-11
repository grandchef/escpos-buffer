import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { Align, Style } from '../../src/actions';
import { load } from '../helper';

describe('bematech model profile', () => {
  it('write bold text from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    await printer.setColumns(42);
    await printer.writeln('Bold text', Style.Bold, Align.Center);
    await printer.setColumns(50);
    await printer.writeln('Bold text', Style.Bold, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_bold_text_font_changed', connection.buffer()),
    );
  });

  it('write bold text on another font from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    await printer.setColumns(42);
    await printer.writeln('Bold text', Style.Bold, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_bold_text_other_font', connection.buffer()),
    );
  });

  it('write text with double width and height from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    await printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_large_text', connection.buffer()),
    );
  });

  it('draw qrcode from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    await printer.setAlignment(Align.Center);
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    await printer.setAlignment(Align.Left);
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_qrcode', connection.buffer()),
    );
  });

  it('emit buzzer from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_buzzer', connection.buffer()),
    );
  });

  it('emit buzzer from model MP-2800 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-2800 TH', connection);
    printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('mp-2800_th_buzzer', connection.buffer()),
    );
  });

  it('emit buzzer on another font from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    await printer.setColumns(42);
    printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_buzzer_other_font', connection.buffer()),
    );
  });

  it('activate drawer from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_drawer', connection.buffer()),
    );
  });

  it('activate drawer on another font from model MP-4200 TH', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('MP-4200 TH', connection);
    await printer.setColumns(42);
    printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('mp-4200_th_drawer_other_font', connection.buffer()),
    );
  });
});
