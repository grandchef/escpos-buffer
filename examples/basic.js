const { Printer, Style, Align, Drawer, Model, InMemory } = require('../')

const model = new Model('MP-4200 TH')
const connection = new InMemory()
const printer = new Printer(model, connection)
printer.columns = 56
printer.write('Simple Text *** ')
printer.writeln('Bold Text -> complete line text.[]123456', Style.Bold)
printer.writeln('Double Height', Style.DoubleHeight | Style.Bold, Align.Center)
printer.writeln('Double Width', Style.DoubleWidth, Align.Center)
printer.writeln('Áçênts R$ 5,00', Style.DoubleWidth | Style.DoubleHeight, Align.Center)
printer.feed(6)
printer.buzzer()
printer.cutter()
printer.drawer(Drawer.First)
process.stdout.write(connection.buffer())

//> node examples/basic.js | lp -d MyCupsPrinterName
