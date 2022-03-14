const { Printer, Style, Align, Drawer, Model, InMemory, Image } = require('../')
const path = require('path');

(async () => {
  const args = process.argv.slice(2)
  const no_qrcode = args[2]
  const no_picture = args[3]
  const modelName = args[0] || 'MP-4200 TH'
  const capability = Model.EXPAND(Model.FIND(modelName))
  const model = new Model(modelName)
  const { feed } = capability
  const connection = new InMemory()
  const printer = await Printer.CONNECT(model, connection)
  await printer.setColumns(args[1] || 48)
  await printer.writeln('Align Center', 0, Align.Center)
  await printer.writeln('Align Left', 0, Align.Left)
  await printer.writeln('Align Right', 0, Align.Right)
  await printer.writeln()
  await printer.writeln('Bold Text', Style.Bold, Align.Center)
  await printer.writeln('Italic Text', Style.Italic, Align.Center)
  await printer.writeln('Underline Text', Style.Underline, Align.Center)
  await printer.writeln('Condensed Text', Style.Condensed, Align.Center)
  await printer.writeln('All Styles', Style.Bold + Style.Italic + Style.Underline + Style.Condensed, Align.Center)
  await printer.writeln()
  await printer.writeln('DOUBLE WIDTH', Style.DoubleWidth, Align.Center)
  await printer.writeln('DOUBLE HEIGHT', Style.DoubleHeight, Align.Center)
  await printer.writeln('WIDTH AND HEIGHT', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
  await printer.writeln()
  await printer.writeln('With bold', 0, Align.Center)
  await printer.writeln('DOUBLE WIDTH', Style.DoubleWidth + Style.Bold, Align.Center)
  await printer.writeln('DOUBLE HEIGHT', Style.DoubleHeight + Style.Bold, Align.Center)
  await printer.writeln('WIDTH AND HEIGHT', Style.DoubleWidth + Style.DoubleHeight + Style.Bold, Align.Center)
  await printer.writeln()
  await printer.writeln('Áçênts $ 5', Style.DoubleWidth | Style.DoubleWidth, Align.Center)
  await printer.writeln()
  await printer.writeln(`Columns: ${printer.columns}`, 0, Align.Center)
  await printer.writeln('1       10        20        30        40        50        60       70         80')
  await printer.writeln('12345678901234567890123456789012345678901234567890123456789012345678901234567890')
  await printer.writeln()

  if (!no_qrcode) {
    await printer.writeln('QR Code', 0, Align.Center)
    await printer.setAlignment(Align.Center)
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    await printer.setAlignment(Align.Left)
    await printer.writeln('End QR Code', 0, Align.Center)
  }
  if (!no_picture) {
    const image = new Image(path.join(__dirname, 'transparent_sample.png'))
    await printer.writeln('Picture', 0, Align.Center)
    await printer.setAlignment(Align.Center)
    await printer.draw(image)
    const image2 = new Image(path.join(__dirname, 'sample.png'))
    await printer.draw(image2)
    await printer.setAlignment(Align.Left)
    await printer.writeln('End Picture', 0, Align.Center)
  }
  await printer.writeln(`Last Line - Feed: ${feed}`, 0, Align.Center)
  if (feed > 0) {
    await printer.feed(feed)
  }
  await printer.cutter()
  await printer.buzzer()
  await printer.drawer(Drawer.First)
  process.stdout.write(connection.buffer())
})()


//> node examples/test.js "MODEL" COLUMNS | lp -d PRINTER_NAME

// For Windows
//> node examples\test.js "MODEL" COLUMNS > output.bin
//> print /d:\\%COMPUTERNAME%\PRINTER_NAME output.bin
