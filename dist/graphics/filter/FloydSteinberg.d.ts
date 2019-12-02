import { Filter } from '.';
import { PNG } from 'pngjs';
export default class FloydSteinberg implements Filter {
    process(image: PNG): PNG;
}
