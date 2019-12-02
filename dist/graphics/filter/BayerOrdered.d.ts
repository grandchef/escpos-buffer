import { Filter } from '.';
import { PNG } from 'pngjs';
export default class BayerOrdered implements Filter {
    process(image: PNG): PNG;
}
