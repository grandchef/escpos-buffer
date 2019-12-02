import Epson from './Epson';
import { Drawer, Style } from '../Printer';
import { Font } from '../capabilities';
export default class Bematech extends Epson {
    protected setStyle(style: Style, enable: boolean): void;
    buzzer(): void;
    drawer(number: Drawer, on_time: number, off_time: number): void;
    qrcode(data: string, size: number): Promise<void>;
    protected fontChanged(current: Font, previows: Font): void;
}
