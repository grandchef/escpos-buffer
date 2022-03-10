import { load } from '../../helper';
import { BayerOrdered, Image } from '../../../src';

describe('proccess images using Bayer ordered algorithm', () => {
  it('apply filter on image from buffer', () => {
    const image = new Image(load('sample.png'), new BayerOrdered());
    expect(image.data).toStrictEqual(load('bayer_filter', image.data));
  });
});
