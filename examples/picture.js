const { Printer, Align, Model, InMemory, Image } = require('../dist')
const path = require('path')

const image = new Image(path.join(__dirname, 'sample.png'))
const model = new Model('MP-4200 TH')
const connection = new InMemory()
const printer = new Printer(model, connection)
printer.alignment = Align.Center
printer.draw(image)
printer.alignment = Align.Left
printer.feed(5)
printer.buzzer()
printer.cutter()
process.stdout.write(connection.buffer())

//> node examples/picture.js | lp -d MyCupsPrinterName
