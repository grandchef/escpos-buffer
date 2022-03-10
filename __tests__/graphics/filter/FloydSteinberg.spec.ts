import { load } from '../../helper';
import { FloydSteinberg, Image } from '../../../src';

describe('proccess images using Floyd and Steinberg algorithm', () => {
  it('apply filter on image from buffer', () => {
    const image = new Image(load('sample.png'), new FloydSteinberg());
    expect(image.data).toStrictEqual(
      load('floyd_steinberg_filter', image.data),
    );
  });
});
