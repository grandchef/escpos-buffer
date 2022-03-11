import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { Align, Style } from '../../src/actions';
import { load } from '../helper';

describe('generic model profile', () => {
  it('write line text from model CMP-20', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('CMP-20', connection);
    await printer.writeln('Large Text');
    expect(connection.buffer()).toStrictEqual(
      load('cmp-20_text_line', connection.buffer()),
    );
  });

  it('write text with double width and height from model CMP-20', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('CMP-20', connection);
    await printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('cmp-20_large_text', connection.buffer()),
    );
  });

  it('write text with double width and height from Generic 80mm', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('POS-80', connection);
    await printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('generic-80mm_large_text', connection.buffer()),
    );
  });

  it('draw qrcode from model CMP-20', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('CMP-20', connection);
    await printer.setAlignment(Align.Center);
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    await printer.setAlignment(Align.Left);
    expect(connection.buffer()).toStrictEqual(
      load('cmp-20_qrcode', connection.buffer()),
    );
  });
});
