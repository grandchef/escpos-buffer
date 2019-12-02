"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var Align;
(function (Align) {
    Align[Align["Left"] = 0] = "Left";
    Align[Align["Center"] = 1] = "Center";
    Align[Align["Right"] = 2] = "Right";
})(Align = exports.Align || (exports.Align = {}));
var Style;
(function (Style) {
    Style[Style["Bold"] = 1] = "Bold";
    Style[Style["Italic"] = 2] = "Italic";
    Style[Style["Underline"] = 4] = "Underline";
    Style[Style["Condensed"] = 8] = "Condensed";
    Style[Style["DoubleWidth"] = 16] = "DoubleWidth";
    Style[Style["DoubleHeight"] = 32] = "DoubleHeight";
})(Style = exports.Style || (exports.Style = {}));
var Cut;
(function (Cut) {
    Cut[Cut["Full"] = 0] = "Full";
    Cut[Cut["Partial"] = 1] = "Partial";
})(Cut = exports.Cut || (exports.Cut = {}));
var Drawer;
(function (Drawer) {
    Drawer[Drawer["First"] = 0] = "First";
    Drawer[Drawer["Second"] = 1] = "Second";
})(Drawer = exports.Drawer || (exports.Drawer = {}));
class Printer {
    constructor(model, connection) {
        connection.open();
        this.model = model;
        this.model.profile.connection = connection;
        this.model.profile.initialize();
    }
    set codepage(value) {
        this.model.profile.codepage = value;
    }
    buzzer() {
        this.model.profile.buzzer();
    }
    cutter(mode = Cut.Partial) {
        this.model.profile.cutter(mode);
    }
    drawer(number = Drawer.First, on_time = 120, off_time = 240) {
        this.model.profile.drawer(number, on_time, off_time);
    }
    draw(image) {
        this.model.profile.draw(image);
    }
    qrcode(data, size = null) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.model.profile.qrcode(data, size);
        });
    }
    set alignment(align) {
        this.model.profile.alignment = align;
    }
    write(text, styles = 0) {
        this.model.profile.write(text, styles);
    }
    writeln(text = '', styles = 0, align = Align.Left) {
        this.model.profile.writeln(text, styles, align);
    }
    feed(lines = 1) {
        this.model.profile.feed(lines);
    }
    get columns() {
        return this.model.profile.columns;
    }
    set columns(value) {
        this.model.profile.columns = value;
    }
    close() {
        this.model.profile.finalize();
    }
}
exports.default = Printer;
//# sourceMappingURL=Printer.js.map