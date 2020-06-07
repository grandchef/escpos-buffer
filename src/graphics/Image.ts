import { Filter, FloydSteinberg } from './filter';
import * as fs from 'fs';
import { PNG } from 'pngjs';

export default class Image {
  data: Buffer;
  lines: number;
  width: number;
  bytesPerRow: number;

  constructor(
    input: string | Buffer | PNG = null,
    filter: Filter = new FloydSteinberg(),
  ) {
    if (input instanceof PNG) {
      this.readImage(filter.process(input));
    } else if (typeof input === 'string') {
      this.loadImage(input, filter);
    } else if (input) {
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
            const src_red = image.data[img_y * width * 4 + img_x * 4 + 0];
            const src_green = image.data[img_y * width * 4 + img_x * 4 + 1];
            const src_blue = image.data[img_y * width * 4 + img_x * 4 + 2];
            const src_alpha = image.data[img_y * width * 4 + img_x * 4 + 3];
            // apply white background
            const bkg_red = 0xff;
            const bkg_green = 0xff;
            const bkg_blue = 0xff;
            // final color
            const alpha = src_alpha / 0xff;
            const red = alpha * src_red + (1 - alpha) * bkg_red;
            const green = alpha * src_green + (1 - alpha) * bkg_green;
            const blue = alpha * src_blue + (1 - alpha) * bkg_blue;

            const greyness =
              Math.trunc(red * 0.3 + green * 0.59 + blue * 0.11) >> 7;
            // 1 for black, 0 for white, taking into account transparency
            const dot = 1 - greyness;
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
