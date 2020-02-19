import { Connection } from '.';

export default class WebUSB implements Connection {
  constructor(private device: USBDevice) {}

  async open(): Promise<void> {
    await this.device.open();
    await this.device.selectConfiguration(1);
    await this.device.claimInterface(0);
  }

  write(data: Buffer): Promise<USBOutTransferResult> {
    return this.device.transferOut(1, data);
  }

  close(): Promise<void> {
    return this.device.close();
  }
}
