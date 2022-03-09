import InMemory from '../../src/connection/InMemory';
import Printer from '../../src/Printer';
import { load } from '../helper';

describe('sweda model profile', () => {
  it('emit buzzer from model SI-300L', async () => {
    const connection = new InMemory();
    const printer = await Printer.CONNECT('SI-300L', connection);
    printer.buzzer();
    expect(connection.buffer()).toStrictEqual(
      load('si-300l_buzzer', connection.buffer()),
    );
  });
});
