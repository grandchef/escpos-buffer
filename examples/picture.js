const { Printer, Align, Model, InMemory, Image } = require('../dist')
const fs = require('fs');
const path = require('path');

(async () => {
  const image = new Image({
    data: fs.readFileSync(path.join(__dirname, 'sample.png')),
    width: 180,
    height: 215
  })
  const model = new Model('MP-4200 TH')
  const connection = new InMemory()
  const printer = await Printer.CONNECT(model, connection)
  await printer.setAlignment(Align.Center)
  await printer.draw(image)
  await printer.setAlignment(Align.Left)
  await printer.feed(5)
  await printer.buzzer()
  await printer.cutter()
  process.stdout.write(connection.buffer())
})()

//> node examples/picture.js | lp -d MyCupsPrinterName
