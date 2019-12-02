import { load } from '../helper'
import { Image } from '../../src'

describe('proccess images to printing format', () => {
  it('load image from buffer', () => {
    const image = new Image(load('sample.png'))
    expect(image.width).toBe(180)
  })
})
