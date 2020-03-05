import WebUSB from '../../src/connection/WebUSB';

describe('WebUSB', () => {
  const device = ({
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
    await webUsb.write(buffer);
    expect(device.transferOut).toHaveBeenCalledWith(1, buffer);
  });

  it('closes the connection', async () => {
    const webUsb = new WebUSB(device);
    await webUsb.close();
    expect(device.close).toHaveBeenCalledTimes(1);
  });
});
