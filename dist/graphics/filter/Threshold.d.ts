import { Filter } from '.';
import { PNG } from 'pngjs';
export default class Threshold implements Filter {
    process(image: PNG): PNG;
}
