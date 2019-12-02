"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Elgin_1 = require("./Elgin");
class Perto extends Elgin_1.default {
    buzzer() {
        this.connection.write(Buffer.from('\x07', 'ascii'));
    }
    cutter(_) {
        this.connection.write(Buffer.from('\x1BJ\x18\x1DVB(', 'ascii'));
    }
}
exports.default = Perto;
//# sourceMappingURL=Perto.js.map