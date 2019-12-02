"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemory {
    open() {
        this.list = [];
    }
    write(data) {
        this.list.push(data);
    }
    close() {
    }
    buffer() {
        return Buffer.concat(this.list);
    }
}
exports.default = InMemory;
//# sourceMappingURL=InMemory.js.map