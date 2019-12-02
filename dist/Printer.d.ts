import Model from './Model';
import { Connection } from './connection';
import Image from './graphics/Image';
export declare enum Align {
    Left = 0,
    Center = 1,
    Right = 2
}
export declare enum Style {
    Bold = 1,
    Italic = 2,
    Underline = 4,
    Condensed = 8,
    DoubleWidth = 16,
    DoubleHeight = 32
}
export declare enum Cut {
    Full = 0,
    Partial = 1
}
export declare enum Drawer {
    First = 0,
    Second = 1
}
export default class Printer {
    private model;
    constructor(model: Model, connection: Connection);
    set codepage(value: string);
    buzzer(): void;
    cutter(mode?: Cut): void;
    drawer(number?: Drawer, on_time?: number, off_time?: number): void;
    draw(image: Image): void;
    qrcode(data: string, size?: number): Promise<void>;
    set alignment(align: Align);
    write(text: string, styles?: number): void;
    writeln(text?: string, styles?: number, align?: Align): void;
    feed(lines?: number): void;
    get columns(): number;
    set columns(value: number);
    close(): void;
}
