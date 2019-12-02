[![TypeScript version][ts-badge]][typescript-37]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][LICENSE]
[![Build Status][travis-badge]][travis-ci]

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

## Basic example
```js
const { Printer, Style, Align, Drawer, Model, InMemory } = require('escpos-buffer')

const model = new Model('MP-4200 TH')
const connection = new InMemory()
const printer = new Printer(model, connection)
printer.columns = 56
printer.write('Simple Text *** ')
printer.writeln('Bold Text -> complete line text.[]123456', Style.Bold)
printer.writeln('Double height', Style.DoubleHeight | Style.Bold, Align.Center)
printer.writeln('Áçênts R$ 5,00', Style.DoubleWidth | Style.DoubleWidth, Align.Center)
printer.feed(6)
printer.buzzer()
printer.cutter()
printer.drawer(Drawer.First)
process.stdout.write(connection.buffer())

// to print, run command bellow on terminal
//> node examples/basic.js | lp -d MyCupsPrinterName
```

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `test:debug` - run tests debugging

## License
Licensed under the MIT. See the [LICENSE](https://github.com/grandchef/escpos-buffer/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.7-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2010-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v10.x/docs/api/
[travis-badge]: https://travis-ci.org/grandchef/escpos-buffer.svg?branch=master
[travis-ci]: https://travis-ci.org/grandchef/escpos-buffer
[typescript]: https://www.typescriptlang.org/
[typescript-37]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/grandchef/escpos-buffer/blob/master/LICENSE
