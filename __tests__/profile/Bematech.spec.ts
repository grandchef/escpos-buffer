import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align, Style } from '../../src/Printer'
import { load } from '../helper'

describe('bematech model profile', () => {
  it('write bold text from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.columns = 42
    printer.writeln('Bold text', Style.Bold, Align.Center)
    printer.columns = 50
    printer.writeln('Bold text', Style.Bold, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_bold_text_font_changed', connection.buffer()))
  })

  it('write bold text on another font from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.columns = 42
    printer.writeln('Bold text', Style.Bold, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_bold_text_other_font', connection.buffer()))
  })

  it('write text with double width and height from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.writeln('Large Text', Style.DoubleWidth + Style.DoubleHeight, Align.Center)
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_large_text', connection.buffer()))
  })

  it('draw qrcode from model MP-4200 TH', async () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.alignment = Align.Center
    await printer.qrcode('https://github.com/grandchef/escpos-buffer')
    printer.alignment = Align.Left
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_qrcode', connection.buffer()))
  })

  it('emit buzzer from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.buzzer()
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_buzzer', connection.buffer()))
  })

  it('emit buzzer from model MP-2800 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-2800 TH'), connection)
    printer.buzzer()
    expect(connection.buffer()).toStrictEqual(load('mp-2800_th_buzzer', connection.buffer()))
  })

  it('emit buzzer on another font from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.columns = 42
    printer.buzzer()
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_buzzer_other_font', connection.buffer()))
  })

  it('activate drawer from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.drawer()
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_drawer', connection.buffer()))
  })

  it('activate drawer on another font from model MP-4200 TH', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('MP-4200 TH'), connection)
    printer.columns = 42
    printer.drawer()
    expect(connection.buffer()).toStrictEqual(load('mp-4200_th_drawer_other_font', connection.buffer()))
  })
})
