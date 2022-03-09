import { Connection } from '.';

export default class WebUSB implements Connection {
  private endpointNumber: number = 1;

  constructor(private device: USBDevice) {}

  async open({
    configuration = 1,
    interface: interfaceNumber = 0,
  }: {
    configuration?: number;
    interface?: number;
  } = {}): Promise<void> {
    await this.device.open();
    await this.device.selectConfiguration(configuration);
    await this.device.claimInterface(interfaceNumber);
    const iface = this.device.configuration.interfaces[interfaceNumber];
    const endpoint = iface.alternate.endpoints.find(
      (e: USBEndpoint) => e.direction === 'out',
    );
    this.endpointNumber = endpoint.endpointNumber;
  }

  async write(data: Buffer): Promise<void> {
    await this.device.transferOut(this.endpointNumber, data);
  }

  close(): Promise<void> {
    return this.device.close();
  }
}
