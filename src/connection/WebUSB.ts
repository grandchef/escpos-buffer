import { Connection } from '.';

export default class WebUSB implements Connection {
  private endpointNumber: number = -1;

  constructor(
    private device: USBDevice,
    private configurationValue: number = -1,
    private interfaceNumber: number = -1,
  ) {}

  async open(): Promise<void> {
    await this.device.open();
    if (this.configurationValue === -1 || this.interfaceNumber === -1) {
      this.autoSelect();
    }
    await this.device.selectConfiguration(this.configurationValue);
    await this.device.claimInterface(this.interfaceNumber);
    const iface = this.device.configuration.interfaces[this.interfaceNumber];
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

  autoSelect() {
    // select first configuration with interface having out direction
    this.device.configurations.find((config: USBConfiguration) => {
      if (
        this.configurationValue !== -1 &&
        config.configurationValue !== this.configurationValue
      ) {
        return false;
      }
      // select first interface having out direction
      return (
        config.interfaces.findIndex((iface: USBInterface) => {
          if (
            this.interfaceNumber !== -1 &&
            iface.interfaceNumber !== this.interfaceNumber
          ) {
            return false;
          }
          const endpoint = iface.alternate.endpoints.find(
            (e: USBEndpoint) => e.direction === 'out',
          );
          if (!endpoint) {
            return false;
          }
          this.configurationValue = config.configurationValue;
          this.interfaceNumber = iface.interfaceNumber;
          return true;
        }) >= 0
      );
    });
  }
}
