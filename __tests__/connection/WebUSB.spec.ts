import { WebUSB } from '../../src/connection';

const OUT_ENDPOINT_NUMBER = 2;

describe('WebUSB', () => {
  const unwantedConfiguration = {
    configurationValue: 1,
    interfaces: [
      {
        interfaceNumber: 0,
        alternate: {
          endpoints: [
            { direction: 'in', endpointNumber: 1 },
          ],
        },
      },
      {
        interfaceNumber: 1,
        alternate: {
          endpoints: [
            { direction: 'in', endpointNumber: 1 },
            { direction: 'in', endpointNumber: 2 },
          ],
        },
      },
    ],
  }
  const configuration = {
    configurationValue: 2,
    interfaces: [
      {
        interfaceNumber: 0,
        alternate: {
          endpoints: [
            { direction: 'in', endpointNumber: 1 },
            { direction: 'in', endpointNumber: 2 },
          ],
        },
      },
      {
        interfaceNumber: 1,
        alternate: {
          endpoints: [
            { direction: 'in', endpointNumber: 1 },
            { direction: 'out', endpointNumber: OUT_ENDPOINT_NUMBER },
          ],
        },
      },
    ],
  }
  const device = ({
    configuration,
    configurations: [unwantedConfiguration, configuration],
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
    expect(device.selectConfiguration).toHaveBeenCalledWith(2);
    expect(device.claimInterface).toHaveBeenCalledWith(1);
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

  it('allows override of configuration', async () => {
    const configuration = 2;
    const interfaceNumber = 1;
    const webUsb = new WebUSB(device, configuration);
    await webUsb.open();
    expect(device.selectConfiguration).toHaveBeenCalledWith(configuration);
    expect(device.claimInterface).toHaveBeenCalledWith(interfaceNumber);
  });

  it('allows override of interface', async () => {
    const configuration = 2;
    const interfaceNumber = 1;
    const webUsb = new WebUSB(device, -1, interfaceNumber);
    await webUsb.open();
    expect(device.selectConfiguration).toHaveBeenCalledWith(configuration);
    expect(device.claimInterface).toHaveBeenCalledWith(interfaceNumber);
  });

  it('allows override of configuration and interface', async () => {
    const configuration = 2;
    const interfaceNumber = 1;
    const webUsb = new WebUSB(device, configuration, interfaceNumber);
    await webUsb.open();
    expect(device.selectConfiguration).toHaveBeenCalledWith(configuration);
    expect(device.claimInterface).toHaveBeenCalledWith(interfaceNumber);
  });

  it('closes the connection', async () => {
    const webUsb = new WebUSB(device);
    await webUsb.close();
    expect(device.close).toHaveBeenCalledTimes(1);
  });
});
