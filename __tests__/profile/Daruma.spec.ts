import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align, Style } from '../../src/Printer'
import { load } from '../helper'
import { Image } from '../../src'

describe('daruma model profile', () => {
  it('write bold text from model DR800', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('DR800'), connection)
    printer.writeln('Bold text', Style.Bold, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('dr800_bold_text', connection.buffer()))
  })

  it('write text with double width and height from model DR800', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('DR800'), connection)
    printer.writeln('Large Text', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('dr800_large_text', connection.buffer()))
  })

  it('activate drawer from model DR800', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('DR800'), connection)
    printer.drawer()
    expect(connection.buffer()).toStrictEqual(load('dr800_drawer', connection.buffer()))
  })

  it('draw qrcode from model DR800', async () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('DR800'), connection)
    printer.alignment = Align.Center
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    printer.alignment = Align.Left
    expect(connection.buffer()).toStrictEqual(load('dr800_qrcode', connection.buffer()))
  })

  it('draw picture from buffer from model DR800', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('DR800'), connection)
    const image = new Image(load('sample.png'))
    printer.alignment = Align.Center
    printer.draw(image)
    printer.alignment = Align.Left
    printer.close()
    expect(connection.buffer()).toStrictEqual(load('dr800_draw_buffer', connection.buffer()))
  })
})
