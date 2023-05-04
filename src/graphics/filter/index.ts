import { ImageData } from '../Image';

export { default as Threshold } from './Threshold';
export { default as BayerOrdered } from './BayerOrdered';
export { default as FloydSteinberg } from './FloydSteinberg';

export interface Filter {
  process(imageData: ImageData): ImageData;
}
