import Model from '../../src/Model'
import InMemory from '../../src/connection/InMemory'
import Printer, { Align } from '../../src/Printer'
import { load } from '../helper'

describe('diebold model profile', () => {
  it('change font from model TSP-143', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('TSP-143'), connection)
    printer.columns = 52;
    printer.writeln('Font Changed')
    expect(connection.buffer()).toStrictEqual(load('tsp-143_font_changed', connection.buffer()))
  })

  it('cut paper from model TSP-143', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('TSP-143'), connection)
    printer.writeln('Cut below', 0, Align.Center)
    printer.cutter()
    expect(connection.buffer()).toStrictEqual(load('tsp-143_cutter', connection.buffer()))
  })

  it('emit buzzer from model TSP-143', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('TSP-143'), connection)
    printer.buzzer()
    expect(connection.buffer()).toStrictEqual(load('tsp-143_buzzer', connection.buffer()))
  })

  it('activate drawer from model TSP-143', () => {
    const connection = new InMemory()
    const printer = new Printer(new Model('TSP-143'), connection)
    printer.drawer()
    expect(connection.buffer()).toStrictEqual(load('tsp-143_drawer', connection.buffer()))
  })
})
