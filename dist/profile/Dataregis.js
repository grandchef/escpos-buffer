"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Elgin_1 = require("./Elgin");
class Dataregis extends Elgin_1.default {
    buzzer() {
        this.connection.write(Buffer.from('\x07', 'ascii'));
    }
}
exports.default = Dataregis;
//# sourceMappingURL=Dataregis.js.map