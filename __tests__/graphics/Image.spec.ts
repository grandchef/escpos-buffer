import * as path from 'path';
import { ImageManager } from 'escpos-buffer-image';

import { Image, ImageData, Manager } from '../../src';

class ManagerTest extends Manager {
  loadImage(_filename: string): Promise<ImageData> {
    return Promise.resolve(null as ImageData);
  }
  loadImageFromBuffer(_data: Buffer): Promise<ImageData> {
    return Promise.resolve(null as ImageData);
  }
  buildQrcodeImage(_data: string, _size: number): Promise<ImageData> {
    return Promise.resolve(null as ImageData);
  }
}

describe('proccess images to printing format', () => {
  it('instanciate a manager class', () => {
    new ManagerTest();
  });

  it('load image from buffer', async () => {
    const imageManager = new ImageManager();
    const imageData = await imageManager.loadImage(
      path.join(__dirname, '../resources/sample.png'),
    );
    const image = new Image(imageData);
    expect(image.width).toBe(180);
  });

  it('allow image cache', async () => {
    const imageManager = new ImageManager();
    const imageDataCache = await imageManager.loadImage(
      path.join(__dirname, '../resources/sample.png'),
    );
    const imageData = await imageManager.loadImage(
      path.join(__dirname, '../resources/transparent_sample.png'),
    );
    const cache = new Image(imageDataCache);
    const image = new Image(imageData);
    Object.assign(image, cache);
    expect(image.width).toBe(180);
  });
});
