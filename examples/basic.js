const { Printer, Style, Align, Drawer, Model, InMemory } = require('../');

(async () => {
  const model = new Model('MP-4200 TH')
  const connection = new InMemory()
  const printer = await Printer.CONNECT(model, connection)
  await printer.setColumns(56)
  await printer.write('Simple Text *** ')
  await printer.writeln('Bold Text -> complete line text.[]123456', Style.Bold)
  await printer.writeln('Double Height', Style.DoubleHeight | Style.Bold, Align.Center)
  await printer.writeln('Double Width', Style.DoubleWidth, Align.Center)
  await printer.writeln('Áçênts R$ 5,00', Style.DoubleWidth | Style.DoubleHeight, Align.Center)
  await printer.feed(6)
  await printer.buzzer()
  await printer.cutter()
  await printer.drawer(Drawer.First)
  process.stdout.write(connection.buffer())
})()

//> node examples/basic.js | lp -d MyCupsPrinterName
