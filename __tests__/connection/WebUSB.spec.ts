import WebUSB from '../../src/connection/WebUSB';

const OUT_ENDPOINT_NUMBER = 2;

describe('WebUSB', () => {
  const device = ({
    configuration: {
      interfaces: [
        {
          alternate: {
            endpoints: [
              { direction: 'in', endpointNumber: 1 },
              { direction: 'out', endpointNumber: OUT_ENDPOINT_NUMBER },
            ],
          },
        },
        {
          alternate: {
            endpoints: [
              { direction: 'in', endpointNumber: 1 },
              { direction: 'in', endpointNumber: 2 },
              { direction: 'out', endpointNumber: 3 },
            ],
          },
        },
      ],
    },
    open: jest.fn().mockReturnValue(Promise.resolve()),
    selectConfiguration: jest.fn().mockReturnValue(Promise.resolve()),
    claimInterface: jest.fn().mockReturnValue(Promise.resolve()),
    transferOut: jest.fn().mockReturnValue(Promise.resolve()),
    close: jest.fn().mockReturnValue(Promise.resolve()),
  } as unknown) as USBDevice;

  afterEach(() => jest.clearAllMocks());

  it('opens the connection', async () => {
    const webUsb = new WebUSB(device);
    await webUsb.open();
    expect(device.open).toHaveBeenCalledTimes(1);
    expect(device.selectConfiguration).toHaveBeenCalledWith(1);
    expect(device.claimInterface).toHaveBeenCalledWith(0);
  });

  it('writes data', async () => {
    const buffer = Buffer.from('hello');
    const webUsb = new WebUSB(device);
    await webUsb.open();
    await webUsb.write(buffer);
    expect(device.transferOut).toHaveBeenCalledWith(
      OUT_ENDPOINT_NUMBER,
      buffer,
    );
  });

  it('allows override of configuration and interface', async () => {
    const webUsb = new WebUSB(device);
    const configuration = 2;
    const interfaceNumber = 1;
    await webUsb.open({ configuration, interface: interfaceNumber });
    expect(device.open).toHaveBeenCalledTimes(1);
    expect(device.selectConfiguration).toHaveBeenCalledWith(configuration);
    expect(device.claimInterface).toHaveBeenCalledWith(interfaceNumber);
  });

  it('closes the connection', async () => {
    const webUsb = new WebUSB(device);
    await webUsb.close();
    expect(device.close).toHaveBeenCalledTimes(1);
  });
});
