/// <reference types="w3c-web-usb" />
/// <reference types="node" />
import { Connection } from '.';
export default class WebUSB implements Connection {
    private device;
    constructor(device: USBDevice);
    open(): Promise<void>;
    write(data: Buffer): Promise<USBOutTransferResult>;
    close(): Promise<void>;
}
