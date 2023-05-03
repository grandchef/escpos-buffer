import * as path from 'path';
import { ImageManager } from 'escpos-buffer-image';
import { load } from '../../helper';
import { Threshold, Image } from '../../../src';

describe('proccess images using threshold algorithm', () => {
  it('apply filter on image from buffer', async () => {
    const imageManager = new ImageManager();
    const imageData = await imageManager.loadImage(
      path.join(__dirname, '../../resources/sample.png'),
    );
    const image = new Image(imageData, new Threshold());
    expect(image.data).toStrictEqual(load('threshold_filter', image.data));
  });
});
