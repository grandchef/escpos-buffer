import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align, Style } from '../../src/Printer'
import { load } from '../helper'

describe('controlid model profile', () => {
  it('write bold text from model PrintiD', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('PrintiD'), connection)
    printer.writeln('Bold text', Style.Bold, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('printid_bold_text', connection.buffer()))
  })

  it('write text with double width and height from model PrintiD', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('PrintiD'), connection)
    printer.writeln('Large Text', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('printid_large_text', connection.buffer()))
  })

  it('draw qrcode from model PrintiD', async () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('PrintiD'), connection)
    printer.alignment = Align.Center
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    printer.alignment = Align.Left
    expect(connection.buffer()).toStrictEqual(load('printid_qrcode', connection.buffer()))
  })
})
