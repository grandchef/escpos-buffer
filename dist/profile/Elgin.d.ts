import Epson from './Epson';
import { Drawer, Style, Cut } from '../Printer';
export default class Elgin extends Epson {
    cutter(mode: Cut): void;
    buzzer(): void;
    drawer(number: Drawer, on_time: number, _: number): void;
    protected setStyle(style: Style, enable: boolean): void;
    protected setMode(mode: number, enable: boolean): void;
    qrcode(data: string, size: number): Promise<void>;
}
