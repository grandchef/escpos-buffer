import { Filter, FloydSteinberg } from './filter';
import * as fs from 'fs';
import { PNG } from 'pngjs';

export default class Image {
  data: Buffer;
  lines: number;
  width: number;
  bytesPerRow: number;

  constructor(
    input: string | Buffer | PNG,
    filter: Filter = new FloydSteinberg(),
  ) {
    if (input instanceof PNG) {
      this.readImage(filter.process(input));
    } else if (typeof input === 'string') {
      this.loadImage(input, filter);
    } else {
      this.loadImageData(input, filter);
    }
  }

  loadImage(filename: string, filter: Filter): void {
    // tslint:disable-next-line: non-literal-fs-path
    const data = fs.readFileSync(filename);
    this.loadImageData(data, filter);
  }

  loadImageData(data: Buffer, filter: Filter): void {
    const png = PNG.sync.read(data);
    const image = filter.process(png);
    this.readImage(image);
  }

  /**
   * Load actual image pixels from PNG image.
   *
   * @param image PNG image
   */
  private readImage(image: PNG): void {
    const width = image.width;
    const img_height = image.height;
    const bits = 24;
    const slices = Math.trunc(bits / 8);
    const height = Math.trunc((img_height + bits - 1) / bits) * bits;
    this.width = width;
    this.bytesPerRow = slices * width;
    this.lines = Math.trunc(height / bits);
    let pos = 0;
    const data = Buffer.alloc((width * height) / 8);
    for (let offset_y = 0; offset_y < img_height; offset_y += bits) {
      for (let img_x = 0; img_x < width; img_x++) {
        // loop slices
        for (let s = 0; s < slices; s++) {
          let slice = 0b00000000;
          for (let bit = 0; bit < 8; bit++) {
            const img_y = offset_y + s * 8 + bit;
            if (img_y >= img_height) {
              break;
            }
            const color = image.data.readUIntBE(
              img_y * width * 4 + img_x * 4,
              4,
            );
            const alpha = (color >> 24) & 0xff;
            const red = (color >> 16) & 0xff;
            const green = (color >> 8) & 0xff;
            const blue = color & 0xff;
            const greyness =
              Math.trunc(red * 0.3 + green * 0.59 + blue * 0.11) >> 7;
            // 1 for black, 0 for white, taking into account transparency
            const dot = (1 - greyness) >> (alpha >> 6);
            // apply the dot
            slice |= dot << (7 - bit);
          }
          data[pos] = slice;
          pos++;
        }
      }
    }
    this.data = data;
  }

  lineData(index: number): Buffer {
    const start = index * this.bytesPerRow;
    return this.data.slice(start, start + this.bytesPerRow);
  }
}
