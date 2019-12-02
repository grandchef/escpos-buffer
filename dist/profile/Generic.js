"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Epson_1 = require("./Epson");
const Printer_1 = require("../Printer");
class Generic extends Epson_1.default {
    setMode(mode, enable) {
        if (enable) {
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x0E', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bd1', 'ascii'));
            }
        }
        else {
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bd0', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x14', 'ascii'));
            }
        }
    }
    qrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.drawQrcode(data, size);
        });
    }
}
exports.default = Generic;
//# sourceMappingURL=Generic.js.map