"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Epson_1 = require("./Epson");
const Printer_1 = require("../Printer");
class Elgin extends Epson_1.default {
    cutter(mode) {
        if (mode == Printer_1.Cut.Full) {
            this.connection.write(Buffer.from('\x1Bw', 'ascii'));
            return;
        }
        super.cutter(mode);
    }
    buzzer() {
        this.connection.write(Buffer.from('\x1B(A\x04\x00\x01\xFF\x00\xFF', 'ascii'));
    }
    drawer(number, on_time, _) {
        const index = {
            [Printer_1.Drawer.First]: 'v',
            [Printer_1.Drawer.Second]: 'v',
        };
        const on_time_char = String.fromCharCode(Math.max(Math.min(on_time, 200), 50));
        this.connection.write(Buffer.from('\x1B' + index[number] + on_time_char, 'ascii'));
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
                this.connection.write(Buffer.from('\x1BW\x01', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bd\x01', 'ascii'));
            }
        }
        else {
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bd\x00', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x1BW\x00', 'ascii'));
            }
        }
    }
    qrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const type = String.fromCharCode(2);
            const error = 'M';
            const _size = String.fromCharCode(Math.min(255, Math.max(1, size || 4)));
            this.connection.write(Buffer.from('\x1Do\x00' + _size + '\x00' + type, 'ascii'));
            this.connection.write(Buffer.from('\x1Dk\x0B' + error + 'A,', 'ascii'));
            this.connection.write(Buffer.from(data, 'ascii'));
            this.connection.write(Buffer.from('\x00', 'ascii'));
        });
    }
}
exports.default = Elgin;
//# sourceMappingURL=Elgin.js.map