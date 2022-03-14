[![Latest Version][version-badge]][npm-link]
[![Build Status][github-badge]][github-ci]
[![TypeScript version][ts-badge]][typescript-37]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

# ESC/POS Printer Library

Library to generate buffer for thermal printers.

## Install

Run command bellow on your project folder

```sh
yarn add escpos-buffer
```

or

```sh
npm install escpos-buffer
```

## Setup

### Node

```js
const { Printer, InMemory } = require('escpos-buffer');

const connection = new InMemory();
const printer = await Printer.CONNECT('MP-4200 TH', connection);
```

### Browser

Use the WebUSB protocol [in Chrome](https://caniuse.com/webusb) to connect directly to the printer.

```js
import { Printer, Model, WebUSB } from 'escpos-buffer';

const device = await navigator.usb.requestDevice({
  filters: [
    {
      vendorId: VENDOR_ID,
    },
  ],
});
const connection = new WebUSB(device);
const printer = await Printer.CONNECT('TM-T20', connection);
```

## Usage

```js
// Following setup above...
await printer.setColumns(56)
await printer.write('Simple Text *** ')
await printer.writeln('Bold Text -> complete line text.[]123456', Style.Bold)
await printer.writeln('Double height', Style.DoubleHeight | Style.Bold, Align.Center)
await printer.writeln('Áçênts R$ 5,00', Style.DoubleWidth | Style.DoubleWidth, Align.Center)
await printer.withStyle({
  width: 4,
  height: 6,
  bold: true,
  italic: true,
  underline: true,
  align: Align.Center,
  }, () => {
    printer.writeln('You can apply multiple styles at once using withStyle()')
    printer.writeln('Font sizes 1-8 are available')
})
await printer.writeln('Default style is restored afterwards')
await printer.feed(6)
await printer.buzzer()
await printer.cutter()
await printer.drawer(Drawer.First)

// For buffered connection (output to stdout)
process.stdout.write(connection.buffer())

// to print, run command bellow on terminal

// For Unix
//> node examples/basic.js | lp -d MyCupsPrinterName

// For Windows
//> node examples\basic.js > output.bin
//> print /d:\\%COMPUTERNAME%\PRINTER_NAME output.bin
```

## Available scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `style:fix` - fix prettier style problems,
- `style:check` - check for prettier style,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
- `test:debug` - run tests debugging

## License

Licensed under the MIT. See the [LICENSE](https://github.com/grandchef/escpos-buffer/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.7-blue.svg
[typescript-37]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2010-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v10.x/docs/api/
[github-badge]: https://github.com/grandchef/escpos-buffer/actions/workflows/main.yml/badge.svg
[github-ci]: https://github.com/grandchef/escpos-buffer/actions
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/grandchef/escpos-buffer/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/escpos-buffer?label=escpos-buffer
[npm-link]: https://www.npmjs.com/package/escpos-buffer
