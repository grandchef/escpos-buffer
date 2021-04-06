const { Printer, Style, Align, Drawer, Model, InMemory, Image } = require('../')
const path = require('path')

const args = process.argv.slice(2)
const no_qrcode = args[2]
const no_picture = args[3]
const modelName = args[0] || 'MP-4200 TH'
const capability = Model.EXPAND(Model.FIND(modelName))
const model = new Model(modelName)
const { feed } = capability
const connection = new InMemory()
const printer = new Printer(model, connection)
printer.columns = args[1] || 48
printer.writeln('Align Center', 0, Align.Center)
printer.writeln('Align Left', 0, Align.Left)
printer.writeln('Align Right', 0, Align.Right)
printer.writeln()
printer.writeln('Bold Text', Style.Bold, Align.Center)
printer.writeln('Italic Text', Style.Italic, Align.Center)
printer.writeln('Underline Text', Style.Underline, Align.Center)
printer.writeln('Condensed Text', Style.Condensed, Align.Center)
printer.writeln('All Styles', Style.Bold + Style.Italic + Style.Underline + Style.Condensed, Align.Center)
printer.writeln()
printer.writeln('DOUBLE WIDTH', Style.DoubleWidth, Align.Center)
printer.writeln('DOUBLE HEIGHT', Style.DoubleHeight, Align.Center)
printer.writeln('WIDTH AND HEIGHT', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
printer.writeln()
printer.writeln('With bold', 0, Align.Center)
printer.writeln('DOUBLE WIDTH', Style.DoubleWidth + Style.Bold, Align.Center)
printer.writeln('DOUBLE HEIGHT', Style.DoubleHeight + Style.Bold, Align.Center)
printer.writeln('WIDTH AND HEIGHT', Style.DoubleWidth + Style.DoubleHeight + Style.Bold, Align.Center)
printer.writeln()
printer.writeln('Áçênts $ 5', Style.DoubleWidth | Style.DoubleWidth, Align.Center)
printer.writeln()
printer.writeln(`Columns: ${printer.columns}`, 0, Align.Center)
printer.writeln('1       10        20        30        40        50        60       70         80')
printer.writeln('12345678901234567890123456789012345678901234567890123456789012345678901234567890')
printer.writeln()

;(async () => {
  if (!no_qrcode) {
    printer.writeln('QR Code', 0, Align.Center)
    printer.alignment = Align.Center
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    printer.alignment = Align.Left
    printer.writeln('End QR Code', 0, Align.Center)
  }
  if (!no_picture) {
    const image = new Image(path.join(__dirname, 'transparent_sample.png'))
    printer.writeln('Picture', 0, Align.Center)
    printer.alignment = Align.Center
    printer.draw(image)
    const image2 = new Image(path.join(__dirname, 'sample.png'))
    printer.draw(image2)
    printer.alignment = Align.Left
    printer.writeln('End Picture', 0, Align.Center)
  }
  printer.writeln(`Last Line - Feed: ${feed}`, 0, Align.Center)
  if (feed > 0) {
    printer.feed(feed)
  }
  printer.cutter()
  printer.buzzer()
  printer.drawer(Drawer.First)
  process.stdout.write(connection.buffer())
})()


//> node examples/test.js "MODEL" COLUMNS | lp -d PRINTER_NAME

// For Windows
//> node examples\test.js "MODEL" COLUMNS > output.bin
//> print /d:\\%COMPUTERNAME%\PRINTER_NAME output.bin
