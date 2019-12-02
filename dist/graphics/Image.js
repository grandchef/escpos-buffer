"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const fs = require("fs");
const pngjs_1 = require("pngjs");
class Image {
    constructor(input, filter = null) {
        const _filter = filter || new filter_1.FloydSteinberg();
        if (typeof input === 'string') {
            this.loadImage(input, _filter);
        }
        else {
            this.loadImageData(input, _filter);
        }
    }
    loadImage(filename, filter) {
        const data = fs.readFileSync(filename);
        const png = pngjs_1.PNG.sync.read(data);
        const image = filter.process(png);
        this.readImage(image);
    }
    loadImageData(data, filter) {
        const png = pngjs_1.PNG.sync.read(data);
        const image = filter.process(png);
        this.readImage(image);
    }
    readImage(image) {
        const width = image.width;
        const img_height = image.height;
        const bits = 24;
        const slices = Math.trunc(bits / 8);
        const height = Math.trunc((img_height + bits - 1) / bits) * bits;
        this.width = width;
        this.bytesPerRow = slices * width;
        this.lines = Math.trunc(height / bits);
        let pos = 0;
        const data = Buffer.alloc(width * height / 8);
        for (let offset_y = 0; offset_y < img_height; offset_y += bits) {
            for (let img_x = 0; img_x < width; img_x++) {
                for (let s = 0; s < slices; s++) {
                    let slice = 0b00000000;
                    for (let bit = 0; bit < 8; bit++) {
                        const img_y = offset_y + s * 8 + bit;
                        if (img_y >= img_height) {
                            break;
                        }
                        const color = image.data.readUIntBE(img_y * width * 4 + img_x * 4, 4);
                        const alpha = (color >> 24) & 0xFF;
                        const red = (color >> 16) & 0xFF;
                        const green = (color >> 8) & 0xFF;
                        const blue = color & 0xFF;
                        const greyness = Math.trunc(red * 0.3 + green * 0.59 + blue * 0.11) >> 7;
                        const dot = (1 - greyness) >> (alpha >> 6);
                        slice |= dot << (7 - bit);
                    }
                    data[pos] = slice;
                    pos++;
                }
            }
        }
        this.data = data;
    }
    lineData(index) {
        const start = index * this.bytesPerRow;
        return this.data.slice(start, start + this.bytesPerRow);
    }
}
exports.default = Image;
//# sourceMappingURL=Image.js.map