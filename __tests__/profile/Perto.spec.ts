import Model from '../../src/Model';
import InMemory from '../../src/connection/InMemory';
import Printer, { Align } from '../../src/Printer';
import { load } from '../helper';

describe('perto model profile', () => {
  it('emit buzzer from model PertoPrinter', async () => {
    const connection = new InMemory();
    const printer = await Printer.connect(
      await Model.initialise('PertoPrinter'),
      connection,
    );
    await printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('perto_printer_buzzer', connection.buffer()),
    );
  });

  it('cut paper from model PertoPrinter', async () => {
    const connection = new InMemory();
    const printer = await Printer.connect(
      await Model.initialise('PertoPrinter'),
      connection,
    );
    await printer.writeln('Cut below', 0, Align.Center);
    await printer.cutter();
    expect(connection.buffer()).toStrictEqual(
      load('perto_printer_cutter', connection.buffer()),
    );
  });
});
