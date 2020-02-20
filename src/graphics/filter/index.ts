export { default as Threshold } from './Threshold';
export { default as BayerOrdered } from './BayerOrdered';
export { default as FloydSteinberg } from './FloydSteinberg';
import { PNG } from 'pngjs';

export interface Filter {
  process(image: PNG): PNG;
}
