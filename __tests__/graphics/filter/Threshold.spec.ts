import { load } from '../../helper';
import { Threshold, Image } from '../../../src';

describe('proccess images using threshold algorithm', () => {
  it('apply filter on image from buffer', () => {
    const image = new Image(load('sample.png'), new Threshold());
    expect(image.data).toStrictEqual(load('threshold_filter', image.data));
  });
});
