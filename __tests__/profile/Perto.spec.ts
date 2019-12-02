import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align } from '../../src/Printer'
import { load } from '../helper'

describe('perto model profile', () => {
  it('emit buzzer from model PertoPrinter', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('PertoPrinter'), connection)
    printer.buzzer()
    expect(connection.buffer()).toStrictEqual(load('perto_printer_buzzer', connection.buffer()))
  })

  it('cut paper from model PertoPrinter', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('PertoPrinter'), connection)
    printer.writeln('Cut below', 0, Align.Center)
    printer.cutter()
    expect(connection.buffer()).toStrictEqual(load('perto_printer_cutter', connection.buffer()))
  })
})
