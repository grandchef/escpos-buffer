import Elgin from './Elgin';
import { Drawer } from '../Printer';
export default class Diebold extends Elgin {
    buzzer(): void;
    drawer(number: Drawer, on_time: number, off_time: number): void;
}
