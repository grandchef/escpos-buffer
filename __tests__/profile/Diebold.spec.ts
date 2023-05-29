import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { Align } from '../../src/actions';
import { load } from '../helper';

describe('diebold model profile', () => {
  it('emit buzzer from model TSP-143', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('TSP-143', connection);
    await printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('tsp-143_buzzer', connection.buffer()),
    );
  });

  it('change font from model TSP-143', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('TSP-143', connection);
    await printer.setColumns(52);
    await printer.writeln('Font Changed');
    expect(connection.buffer()).toStrictEqual(
      load('tsp-143_font_changed', connection.buffer()),
    );
  })

  it('cut paper from model TSP-143', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('TSP-143', connection);
    await printer.writeln('Cut below', 0, Align.Center);
    await printer.cutter();
    expect(connection.buffer()).toStrictEqual(
      load('tsp-143_cutter', connection.buffer()),
    );
  })

  it('activate drawer from model TSP-143', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('TSP-143', connection);
    await printer.drawer();
    expect(connection.buffer()).toStrictEqual(
      load('tsp-143_drawer', connection.buffer()),
    );
  });
});
