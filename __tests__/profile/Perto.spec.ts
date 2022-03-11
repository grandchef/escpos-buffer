import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { Align } from '../../src/actions';
import { load } from '../helper';

describe('perto model profile', () => {
  it('emit buzzer from model PertoPrinter', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('PertoPrinter', connection);
    await printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('perto_printer_buzzer', connection.buffer()),
    );
  });

  it('cut paper from model PertoPrinter', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('PertoPrinter', connection);
    await printer.writeln('Cut below', 0, Align.Center);
    await printer.cutter();
    expect(connection.buffer()).toStrictEqual(
      load('perto_printer_cutter', connection.buffer()),
    );
  });
});
