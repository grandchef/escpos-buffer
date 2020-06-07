import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align, Style } from '../../src/Printer'
import { load } from '../helper'

describe('generic model profile', () => {
  it('write line text from model CMP-20', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('CMP-20'), connection)
    printer.writeln('Large Text')
    expect(connection.buffer()).toStrictEqual(load('cmp-20_text_line', connection.buffer()))
  })

  it('write text with double width and height from model CMP-20', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('CMP-20'), connection)
    printer.writeln('Large Text', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('cmp-20_large_text', connection.buffer()))
  })

  it('write text with double width and height from Generic 80mm', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('POS-80'), connection)
    printer.writeln('Large Text', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('generic-80mm_large_text', connection.buffer()))
  })

  it('draw qrcode from model CMP-20', async () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('CMP-20'), connection)
    printer.alignment = Align.Center
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    printer.alignment = Align.Left
    expect(connection.buffer()).toStrictEqual(load('cmp-20_qrcode', connection.buffer()))
  })
})
