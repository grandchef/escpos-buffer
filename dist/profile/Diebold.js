"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Elgin_1 = require("./Elgin");
const Printer_1 = require("../Printer");
class Diebold extends Elgin_1.default {
    buzzer() {
        this.connection.write(Buffer.from('\x07', 'ascii'));
    }
    drawer(number, on_time, off_time) {
        const index = {
            [Printer_1.Drawer.First]: '0',
            [Printer_1.Drawer.Second]: '1',
        };
        const on_time_char = String.fromCharCode(Math.min(Math.trunc(on_time / 2), 65));
        const off_time_char = String.fromCharCode(Math.min(Math.trunc(off_time / 2), 65));
        this.connection.write(Buffer.from('\x1B&' + index[number] + on_time_char + off_time_char, 'ascii'));
    }
}
exports.default = Diebold;
//# sourceMappingURL=Diebold.js.map