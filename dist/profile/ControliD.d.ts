import Epson from './Epson';
import { Style } from '../Printer';
export default class ControliD extends Epson {
    protected setStyle(style: Style, enable: boolean): void;
    qrcode(data: string, size: number): Promise<void>;
}
