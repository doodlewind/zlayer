/* eslint-env browser */
import { initProgram } from './shaders'
import { initBuffers } from './buffers'
import { initTexture } from './texture'
import { render } from './render'

export class Layer {
  constructor (el, options) {
    this.width = options.width || 0
    this.height = options.height || 0
    this.bleeding = options.bleeding
    this.url = options.url || ''

    const { bleeding } = this
    if (el instanceof HTMLCanvasElement) {
      this.canvas = el
    } else {
      const { width, height } = el.getBoundingClientRect()
      // Ignore default size when use bleeding.
      if (this.bleeding !== undefined) {
        [this.width, this.height] = [width, height]
      }
      this.canvas = document.createElement('canvas')
      this.canvas.style.position = 'absolute'
      this.canvas.style.left = `-${bleeding}px`
      this.canvas.style.top = `-${bleeding}px`
      el.style.position = 'relative'
      el.appendChild(this.canvas)
    }
    this.canvas.width = bleeding ? this.width + bleeding * 2 : this.width
    this.canvas.height = bleeding ? this.height + bleeding * 2 : this.height
    this.gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true })
    this.programInfo = initProgram(this.gl)
    this.buffers = initBuffers(this.gl, this.width, this.height)
    this.texture = initTexture(this.gl, this.url, this.render.bind(this))
  }

  render () {
    render(this.gl, this.canvas, this.programInfo, this.buffers)
  }
}
