const { Printer, Align, Model, InMemory } = require('../dist')

const model = new Model('PrintiD')
const connection = new InMemory()
const printer = new Printer(model, connection)
printer.alignment = Align.Center
;(async () => {
  await printer.qrcode('https://github.com/grandchef/escpos-buffer')
  printer.alignment = Align.Left
  printer.buzzer()
  printer.cutter()
  process.stdout.write(connection.buffer())
})()

//< node examples/qrcode.js | lp -d MyCupsPrinterName
