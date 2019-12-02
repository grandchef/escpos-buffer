import Epson from './Epson';
import { Drawer, Style, Align } from '../Printer';
export default class Daruma extends Epson {
    drawer(number: Drawer, _: number, __: number): void;
    set alignment(align: Align);
    protected setStyle(style: Style, enable: boolean): void;
    protected setMode(mode: number, enable: boolean): void;
    feed(lines: number): void;
    qrcode(data: string, size: number): Promise<void>;
    protected get bitmapCmd(): string;
}
