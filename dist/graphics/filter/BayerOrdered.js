"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BayerOrdered {
    process(image) {
        const width = image.width;
        const height = image.height;
        const new_data = image.data.slice();
        const pattern = [
            [15, 195, 60, 240],
            [135, 75, 180, 120],
            [45, 225, 30, 210],
            [165, 105, 150, 90]
        ];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const color = image.data.readUIntBE(y * width * 4 + x * 4, 4);
                const red = (color >> 16) & 0xFF;
                const green = (color >> 8) & 0xFF;
                const blue = color & 0xFF;
                let gray = Math.trunc(red * 0.3 + green * 0.59 + blue * 0.11);
                const threshold = pattern[y % 4][x % 4];
                gray = (gray + threshold) >> 1;
                const new_color = gray > 127 ? 0xFF : 0;
                new_data[y * width * 4 + x * 4 + 0] = 0;
                new_data[y * width * 4 + x * 4 + 1] = new_color;
                new_data[y * width * 4 + x * 4 + 2] = new_color;
                new_data[y * width * 4 + x * 4 + 3] = new_color;
            }
        }
        image.data = new_data;
        return image;
    }
}
exports.default = BayerOrdered;
//# sourceMappingURL=BayerOrdered.js.map