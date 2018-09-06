/* eslint-env browser */

export class Layer {
  constructor (el, options) {
    const {
      initShaders, initBuffer, initTexture, initFramebufferObject, render
    } = options.plugin

    this.bleeding = options.bleeding
    this.src = options.src || ''

    const { bleeding } = this
    // Init this.canvas instance.
    if (el instanceof HTMLCanvasElement) {
      this.canvas = el
    } else {
      const { width, height } = el.getBoundingClientRect()
      // Ignore default size when use bleeding with DOM container.
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

    // Init texture with image.
    this.image = new Image()
    this.image.onload = () => {
      // Use image size as default size.
      if (this.width === undefined || this.height === undefined) {
        this.width = options.width = this.image.naturalWidth
        this.height = options.height = this.image.naturalHeight
      }
      options.bledWidth = bleeding ? this.width + bleeding * 2 : this.width
      options.bledHeight = bleeding ? this.height + bleeding * 2 : this.height
      this.canvas.width = options.bledWidth
      this.canvas.height = options.bledHeight

      this.gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true })
      this.shaders = initShaders(this.gl)
      // Before first pass, use position without bleeding.
      this.buffer = initBuffer(this.gl, this.width, this.height)

      // Async render on image loaded.
      this.texture = initTexture(this.gl, this.image, this.render)
      // Init FBO without bleeding.
      this.fbo = initFramebufferObject
        ? initFramebufferObject(this.gl, options.bledWidth, options.bledHeight)
        : null
      const { gl, shaders, buffer, texture, fbo } = this
      render(gl, options, shaders, buffer, texture, fbo)
    }
    this.image.src = options.src
  }
}
