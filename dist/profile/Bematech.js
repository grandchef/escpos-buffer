"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Epson_1 = require("./Epson");
const Printer_1 = require("../Printer");
class Bematech extends Epson_1.default {
    setStyle(style, enable) {
        if (this.font.name != 'Font C') {
            return super.setStyle(style, enable);
        }
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
    buzzer() {
        if (this.font.name != 'Font C') {
            this.connection.write(Buffer.from('\x1B(A\x05\x00ad\x02\x02\x01', 'ascii'));
        }
        else {
            super.buzzer();
        }
    }
    drawer(number, on_time, off_time) {
        if (this.font.name != 'Font C') {
            return super.drawer(number, on_time, off_time);
        }
        const index = {
            [Printer_1.Drawer.First]: 'v',
            [Printer_1.Drawer.Second]: '\x80',
        };
        const on_time_char = String.fromCharCode(Math.max(Math.min(on_time, 255), 50));
        this.connection.write(Buffer.from('\x1B' + index[number] + on_time_char, 'ascii'));
    }
    qrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const len = data.length + 3;
            const pL = String.fromCharCode(len & 0xFF);
            const pH = String.fromCharCode((len >> 8) & 0xFF);
            const error = String.fromCharCode(2);
            const _size = String.fromCharCode(Math.min(11, Math.max(1, size || 4)) * 2);
            const version = String.fromCharCode(0);
            const encoding = String.fromCharCode(1);
            this.connection.write(Buffer.from('\x1DkQ', 'ascii'));
            this.connection.write(Buffer.from(error + _size + version + encoding, 'ascii'));
            this.connection.write(Buffer.from(pL + pH, 'ascii'));
            this.connection.write(Buffer.from(data, 'ascii'));
            this.connection.write(Buffer.from('\x00', 'ascii'));
            this.feed(1);
        });
    }
    fontChanged(current, previows) {
        if (current.name == 'Font C') {
            this.connection.write(Buffer.from('\x1D\xf950', 'ascii'));
            return;
        }
        this.connection.write(Buffer.from('\x1D\xf951', 'ascii'));
        super.fontChanged(current, previows);
    }
}
exports.default = Bematech;
//# sourceMappingURL=Bematech.js.map