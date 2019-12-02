"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Epson_1 = require("./Epson");
const Printer_1 = require("../Printer");
class Daruma extends Epson_1.default {
    drawer(number, _, __) {
        const index = {
            [Printer_1.Drawer.First]: 'p',
            [Printer_1.Drawer.Second]: 'p',
        };
        this.connection.write(Buffer.from('\x1B' + index[number], 'ascii'));
    }
    set alignment(align) {
        const cmd = {
            [Printer_1.Align.Left]: '\x1Bj0',
            [Printer_1.Align.Center]: '\x1Bj1',
            [Printer_1.Align.Right]: '\x1Bj2',
        };
        this.connection.write(Buffer.from(cmd[align], 'ascii'));
    }
    setStyle(style, enable) {
        if (enable) {
            if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BE', 'ascii'));
                return;
            }
        }
        else {
            if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BF', 'ascii'));
                return;
            }
        }
        return super.setStyle(style, enable);
    }
    setMode(mode, enable) {
        if (enable) {
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x0E', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bw1', 'ascii'));
            }
        }
        else {
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bw0', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x14', 'ascii'));
            }
        }
    }
    feed(lines) {
        this.connection.write(Buffer.from('\r\n'.repeat(lines), 'ascii'));
    }
    qrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const len = data.length + 2;
            const pL = String.fromCharCode(len & 0xFF);
            const pH = String.fromCharCode((len >> 8) & 0xFF);
            const error = 'M';
            const _size = String.fromCharCode(Math.min(7, Math.max(3, size || 4)));
            this.connection.write(Buffer.from('\x1B\x81', 'ascii'));
            this.connection.write(Buffer.from(pL + pH, 'ascii'));
            this.connection.write(Buffer.from(_size + error, 'ascii'));
            this.connection.write(Buffer.from(data, 'ascii'));
        });
    }
    get bitmapCmd() {
        return '\x1B*m';
    }
}
exports.default = Daruma;
//# sourceMappingURL=Daruma.js.map