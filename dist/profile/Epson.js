"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Printer_1 = require("../Printer");
const _1 = require(".");
class Epson extends _1.Profile {
    feed(lines) {
        if (lines > 1) {
            const count = Math.trunc(lines / 255);
            let cmd = ('\x1Bd' + String.fromCharCode(Math.min(lines, 255))).repeat(count);
            const remaining = lines - count * 255;
            if (remaining > 0) {
                cmd += '\x1Bd' + String.fromCharCode(remaining);
            }
            this.connection.write(Buffer.from(cmd));
        }
        else {
            this.connection.write(Buffer.from('\r\n', 'ascii'));
        }
    }
    cutter(_) {
        this.connection.write(Buffer.from('\x1Bm', 'ascii'));
    }
    buzzer() {
        this.connection.write(Buffer.from('\x07', 'ascii'));
    }
    drawer(number, on_time, off_time) {
        const index = {
            [Printer_1.Drawer.First]: 0,
            [Printer_1.Drawer.Second]: 1,
        };
        const on_time_char = String.fromCharCode(Math.min(Math.trunc(on_time / 2), 255));
        const off_time_char = String.fromCharCode(Math.min(Math.trunc(off_time / 2), 255));
        const index_char = String.fromCharCode(index[number]);
        this.connection.write(Buffer.from('\x1Bp' + index_char + on_time_char + off_time_char, 'ascii'));
    }
    set alignment(align) {
        const cmd = {
            [Printer_1.Align.Left]: '\x1Ba0',
            [Printer_1.Align.Center]: '\x1Ba1',
            [Printer_1.Align.Right]: '\x1Ba2',
        };
        this.connection.write(Buffer.from(cmd[align], 'ascii'));
    }
    setMode(mode, enable) {
        let byte = 0b00000000;
        if (this.font.name == 'Font B') {
            byte |= 0b00000001;
        }
        const before = byte;
        if (Printer_1.Style.DoubleHeight & mode) {
            byte |= 0b00010000;
        }
        if (Printer_1.Style.DoubleWidth & mode) {
            byte |= 0b00100000;
        }
        let mask = 0b00000001;
        if (enable) {
            mask = 0b00110001;
        }
        if (before != byte) {
            this.connection.write(Buffer.from('\x1B!' + String.fromCharCode(byte & mask), 'ascii'));
        }
    }
    setStyle(style, enable) {
        if (enable) {
            if (Printer_1.Style.Condensed == style) {
                this.connection.write(Buffer.from('\x1B\x0f', 'ascii'));
            }
            else if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BE1', 'ascii'));
            }
            else if (Printer_1.Style.Italic == style) {
                this.connection.write(Buffer.from('\x1B4', 'ascii'));
            }
            else if (Printer_1.Style.Underline == style) {
                this.connection.write(Buffer.from('\x1B-1', 'ascii'));
            }
        }
        else {
            if (Printer_1.Style.Underline == style) {
                this.connection.write(Buffer.from('\x1B-0', 'ascii'));
            }
            else if (Printer_1.Style.Italic == style) {
                this.connection.write(Buffer.from('\x1B5', 'ascii'));
            }
            else if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BE0', 'ascii'));
            }
            else if (Printer_1.Style.Condensed == style) {
                this.connection.write(Buffer.from('\x12', 'ascii'));
            }
        }
    }
    qrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tipo = '2';
            const _size = String.fromCharCode(size || 4);
            const error = '0';
            const len = data.length + 3;
            const pL = String.fromCharCode(len & 0xFF);
            const pH = String.fromCharCode((len >> 8) & 0xFF);
            this.connection.write(Buffer.from('\x1D(k\x04\x001A' + tipo + '\x00', 'ascii'));
            this.connection.write(Buffer.from('\x1D(k\x03\x001C' + _size, 'ascii'));
            this.connection.write(Buffer.from('\x1D(k\x03\x001E' + error, 'ascii'));
            this.connection.write(Buffer.from('\x1D(k' + pL + pH + '1P0', 'ascii'));
            this.connection.write(Buffer.from(data, 'ascii'));
            this.connection.write(Buffer.from('\x1D(k\x03\x001Q0', 'ascii'));
        });
    }
    fontChanged(current, previows) {
        if (current.name == 'Font A') {
            this.connection.write(Buffer.from('\x1BM\x00', 'ascii'));
        }
        else {
            this.connection.write(Buffer.from('\x1BM\x01', 'ascii'));
        }
        super.fontChanged(current, previows);
    }
}
exports.default = Epson;
//# sourceMappingURL=Epson.js.map