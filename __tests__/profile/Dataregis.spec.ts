import Model from '../../src/Model';
import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { load } from '../helper';

describe('dataregis model profile', () => {
  it('emit buzzer from model DT200', async () => {
    const connection = new InMemory();
    const printer = await Printer.connect(
      await Model.initialise('DT200'),
      connection,
    );
    await printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('dt200_buzzer', connection.buffer()),
    );
  });
});
