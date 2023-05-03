import * as path from 'path';
import { ImageManager } from 'escpos-buffer-image';
import { load } from '../../helper';
import { BayerOrdered, Image } from '../../../src';

describe('proccess images using Bayer ordered algorithm', () => {
  it('apply filter on image from buffer', async () => {
    const imageManager = new ImageManager();
    const imageData = await imageManager.loadImage(
      path.join(__dirname, '../../resources/sample.png'),
    );
    const image = new Image(imageData, new BayerOrdered());
    expect(image.data).toStrictEqual(load('bayer_filter', image.data));
  });
});
