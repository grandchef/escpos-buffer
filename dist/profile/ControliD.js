"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Epson_1 = require("./Epson");
const Printer_1 = require("../Printer");
class ControliD extends Epson_1.default {
    setStyle(style, enable) {
        if (enable) {
            if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BE\x01', 'ascii'));
                return;
            }
        }
        else {
            if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BE\x00', 'ascii'));
                return;
            }
        }
        return super.setStyle(style, enable);
    }
    qrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.drawQrcode(data, size);
        });
    }
}
exports.default = ControliD;
//# sourceMappingURL=ControliD.js.map