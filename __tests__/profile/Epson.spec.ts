import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align, Style } from '../../src/Printer'
import { load } from '../helper'

describe('epson model profile', () => {
  it('write text from model TM-T20', () => {
    const connection = new InMemory()
    const model = new Model('TM-T20')
    const printer = new Printer(model, connection)
    printer.writeln('Large Text')
    expect(connection.buffer()).toStrictEqual(load('tm-t20_text', connection.buffer()))
  })

  it('write text with double width and height from model TM-T20', () => {
    const connection = new InMemory()
    const model = new Model('TM-T20')
    const printer = new Printer(model, connection)
    printer.columns = 64
    printer.writeln('Large Text', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
    printer.feed(2)
    printer.feed(255)
    expect(model.profile.font.name).toBe('Font B')
    expect(connection.buffer()).toStrictEqual(load('tm-t20_large_text_font', connection.buffer()))
  })

  it('draw qrcode from model TM-T20', async () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('TM-T20'), connection)
    printer.alignment = Align.Center
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    printer.alignment = Align.Left
    expect(connection.buffer()).toStrictEqual(load('tm-t20_qrcode', connection.buffer()))
  })
})
