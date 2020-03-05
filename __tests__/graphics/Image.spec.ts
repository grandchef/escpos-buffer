import { load } from '../helper';
import { Image } from '../../src';
import { PNG } from 'pngjs';

describe('proccess images to printing format', () => {
  it('load image from buffer', () => {
    const image = new Image(load('sample.png'));
    expect(image.width).toBe(180);
  });

  it('allow image cache', () => {
    const cache = new Image(load('sample.png'));
    const image = new Image();
    Object.assign(image, cache);
    expect(image.width).toBe(180);
  });

  it('accepts a pre-loaded PNG instance', async () => {
    const imageBuffer = load('sample.png');

    const png = await new Promise((resolve: Function, reject: Function) => {
      new PNG({ filterType: 4 }).parse(
        imageBuffer,
        (error: Error, data: Buffer) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(data);
        },
      );
    });

    const image = new Image(png);
    expect(image.width).toBe(180);
  });
});
