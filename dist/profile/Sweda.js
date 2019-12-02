"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Elgin_1 = require("./Elgin");
class Sweda extends Elgin_1.default {
    buzzer() {
        this.connection.write(Buffer.from('\x07', 'ascii'));
    }
}
exports.default = Sweda;
//# sourceMappingURL=Sweda.js.map