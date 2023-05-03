import * as path from 'path';
import { ImageManager } from 'escpos-buffer-image';
import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { Align, Style } from '../../src/actions';
import { load } from '../helper';
import { Image } from '../../src';

describe('daruma model profile', () => {
  it('write bold text from model DR800', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('DR800', connection);
    await printer.writeln('Bold text', Style.Bold, Align.Center);
    expect(connection.buffer()).toStrictEqual(
      load('dr800_bold_text', connection.buffer()),
    );
  });

  it('write text with double width and height from model DR800', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('DR800', connection);
    await printer.writeln(
      'Large Text',
      Style.DoubleWidth + Style.DoubleHeight,
      Align.Center,
    );
    expect(connection.buffer()).toStrictEqual(
      load('dr800_large_text', connection.buffer()),
    );
  });

  it('activate drawer from model DR800', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('DR800', connection);
    await printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('dr800_drawer', connection.buffer()),
    );
  });

  it('draw qrcode from model DR800', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('DR800', connection);
    await printer.setAlignment(Align.Center);
    await printer.qrcode('https://github.com/grandchef/escpos-buffer');
    await printer.setAlignment(Align.Left);
    expect(connection.buffer()).toStrictEqual(
      load('dr800_qrcode', connection.buffer()),
    );
  });

  it('draw picture from buffer from model DR800', async () => {
    const connection = new InMemory();
    const imageManager = new ImageManager();
    const printer = await Printer.CONNECT('DR800', connection, imageManager);
    const imageData = await imageManager.loadImage(
      path.join(__dirname, '../resources/sample.png'),
    );
    const image = new Image(imageData);
    await printer.setAlignment(Align.Center);
    await printer.draw(image);
    await printer.setAlignment(Align.Left);
    await printer.close();
    expect(connection.buffer()).toStrictEqual(
      load('dr800_draw_buffer', connection.buffer()),
    );
  });
});
