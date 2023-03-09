import { WebBluetooth } from '../../src/connection';

describe('WebBluetooth', () => {
  const device: BluetoothDevice = {
    name: 'MockDevice',
    id: 'mock-device-id',
    // @ts-ignore
    gatt: {
      connect: jest.fn().mockReturnValue({
        getPrimaryService: jest.fn().mockReturnValue({
          getCharacteristic: jest.fn().mockReturnValue({
            writeValue: jest.fn().mockReturnValue(Promise.resolve()),
          }),
        }),
        disconnect: jest.fn().mockReturnValue(Promise.resolve()),
      }),
    },
  };

  afterEach(() => jest.clearAllMocks());

  it('opens the connection', async () => {
    const webBluetooth = new WebBluetooth(device);
    await webBluetooth.open();

    expect(device.gatt.connect).toHaveBeenCalledTimes(1);
    expect(
      (await device.gatt.connect()).getPrimaryService,
    ).toHaveBeenCalledTimes(1);
    expect(
      (await (await device.gatt.connect()).getPrimaryService(''))
        .getCharacteristic,
    ).toHaveBeenCalledTimes(1);
  });

  it('writes data', async () => {
    const buffer = Buffer.from('hello');
    const webBluetooth = new WebBluetooth(device);
    await webBluetooth.open();
    await webBluetooth.write(buffer);
    expect(
      (
        await (
          await (await device.gatt.connect()).getPrimaryService('')
        ).getCharacteristic('')
      ).writeValue,
    ).toHaveBeenCalledWith(buffer);
  });

  it('closes the connection', async () => {
    const webBluetooth = new WebBluetooth(device);
    await webBluetooth.close();
    expect((await device.gatt.connect()).disconnect).toHaveBeenCalledTimes(1);
  });
});
