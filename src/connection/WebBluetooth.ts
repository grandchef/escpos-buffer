import { Connection } from '.';

export default class WebBluetooth implements Connection {
  private characteristic: BluetoothRemoteGATTCharacteristic = null;

  constructor(private device: BluetoothDevice) {}

  async open(): Promise<void> {
    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(
      '000018f0-0000-1000-8000-00805f9b34fb',
    );
    const characteristic = await service.getCharacteristic(
      '00002af1-0000-1000-8000-00805f9b34fb',
    );

    this.characteristic = characteristic;
  }

  async write(data: Buffer): Promise<void> {
    await this.characteristic.writeValue(data);
  }

  async close(): Promise<void> {
    const server = await this.device.gatt.connect();

    return server.disconnect();
  }
}
