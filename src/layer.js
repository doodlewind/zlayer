/* eslint-env browser */

export class Layer {
  constructor (el, options) {
    this.width = options.width || 0
    this.height = options.height || 0
    const {
      initShaders, initBuffer, initTexture, initFramebufferObject, render
    } = options.plugin

    this.bleeding = options.bleeding
    this.url = options.url || ''

    const { bleeding } = this
    if (el instanceof HTMLCanvasElement) {
      this.canvas = el
    } else {
      const { width, height } = el.getBoundingClientRect()
      // Ignore default size when use bleeding.
      if (bleeding !== undefined) {
        [this.width, this.height] = [width, height]
      }
      this.canvas = document.createElement('canvas')
      this.canvas.style.position = 'absolute'
      this.canvas.style.left = `-${bleeding || 0}px`
      this.canvas.style.top = `-${bleeding || 0}px`
      el.style.position = 'relative'
      el.appendChild(this.canvas)
    }

    options.bledWidth = bleeding ? this.width + bleeding * 2 : this.width
    options.bledHeight = bleeding ? this.height + bleeding * 2 : this.height

    this.render = () => {
      const { gl, shaders, buffer, texture, fbo } = this
      render(gl, options, shaders, buffer, texture, fbo)
    }
    this.canvas.width = options.bledWidth
    this.canvas.height = options.bledHeight
    this.gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true })
    this.shaders = initShaders(this.gl)
    // Before first pass, use position without bleeding.
    this.buffer = initBuffer(this.gl, this.width, this.height)

    // Async render on image loaded.
    this.texture = initTexture(this.gl, this.url, this.render)
    // Init FBO without bleeding.
    this.fbo = initFramebufferObject
      ? initFramebufferObject(this.gl, options.bledWidth, options.bledHeight)
      : null
  }
}
