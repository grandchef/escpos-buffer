const { Printer, Align, Model, InMemory } = require('../dist');

(async () => {
  const model = new Model('PrintiD')
  const connection = new InMemory()
  const printer = await Printer.CONNECT(model, connection)
  await printer.setAlignment(Align.Center)
  await printer.qrcode('https://github.com/grandchef/escpos-buffer')
  await printer.setAlignment(Align.Left)
  await printer.buzzer()
  await printer.cutter()
  process.stdout.write(connection.buffer())
})()

//> node examples/qrcode.js | lp -d MyCupsPrinterName
