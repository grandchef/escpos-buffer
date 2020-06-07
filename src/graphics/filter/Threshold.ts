import { Filter } from '.';
import { PNG } from 'pngjs';

export default class Threshold implements Filter {
  process(image: PNG): PNG {
    const width = image.width;
    const height = image.height;
    const new_data = image.data.slice();
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const red = image.data[y * width * 4 + x * 4 + 0];
        const green = image.data[y * width * 4 + x * 4 + 1];
        const blue = image.data[y * width * 4 + x * 4 + 2];
        const alpha = image.data[y * width * 4 + x * 4 + 3];
        const grey = Math.trunc(red * 0.3 + green * 0.59 + blue * 0.11);
        const new_color = grey > 127 ? 0xff : 0;
        new_data[y * width * 4 + x * 4 + 0] = new_color; // red
        new_data[y * width * 4 + x * 4 + 1] = new_color; // green
        new_data[y * width * 4 + x * 4 + 2] = new_color; // blue
        new_data[y * width * 4 + x * 4 + 3] = alpha; // alpha
      }
    }
    image.data = new_data;
    return image;
  }
}
