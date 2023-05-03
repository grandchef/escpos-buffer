import * as path from 'path';
import { ImageManager } from 'escpos-buffer-image';
import { load } from '../../helper';
import { FloydSteinberg, Image } from '../../../src';

describe('proccess images using Floyd and Steinberg algorithm', () => {
  it('apply filter on image from buffer', async () => {
    const imageManager = new ImageManager();
    const imageData = await imageManager.loadImage(
      path.join(__dirname, '../../resources/sample.png'),
    );
    const image = new Image(imageData, new FloydSteinberg());
    expect(image.data).toStrictEqual(
      load('floyd_steinberg_filter', image.data),
    );
  });
});
