"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class WebUSB {
    constructor(device) {
        this.device = device;
    }
    open() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.device.open();
            yield this.device.selectConfiguration(1);
            yield this.device.claimInterface(0);
        });
    }
    write(data) {
        return this.device.transferOut(1, data);
    }
    close() {
        return this.device.close();
    }
}
exports.default = WebUSB;
//# sourceMappingURL=WebUSB.js.map