import { Align, Style, Drawer, Cut } from '../Printer';
import { Profile } from '.';
import { Font } from '../capabilities';
export default class Epson extends Profile {
    feed(lines: number): void;
    cutter(_: Cut): void;
    buzzer(): void;
    drawer(number: Drawer, on_time: number, off_time: number): void;
    set alignment(align: Align);
    protected setMode(mode: number, enable: boolean): void;
    protected setStyle(style: Style, enable: boolean): void;
    qrcode(data: string, size: number): Promise<void>;
    protected fontChanged(current: Font, previows: Font): void;
}
