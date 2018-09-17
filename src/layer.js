/* eslint-env browser */

export class Layer {
  constructor (el, options) {
    this.options = options
    this.src = options.src || ''

    const { bleeding } = options
    // Init this.canvas instance.
    if (el instanceof HTMLCanvasElement) {
      this.canvas = el
    } else {
      const { width, height } = el.getBoundingClientRect()
      // Ignore default size when use bleeding with DOM container.
      if (bleeding !== undefined) {
        [options.width, options.height] = [width, height]
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
    const { render, initShaders } = options.renderer
    this.render = render.bind(this)

    this.image.onload = () => {
      // Use image size as default size.
      if (options.width === undefined || options.height === undefined) {
        options.width = this.image.naturalWidth
        options.height = this.image.naturalHeight
      }
      options.bledWidth = options.width + (bleeding ? bleeding * 2 : 0)
      options.bledHeight = options.height + (bleeding ? bleeding * 2 : 0)

      this.canvas.width = options.bledWidth
      this.canvas.height = options.bledHeight
      this.gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true })
      this.shaders = initShaders.call(this, this.gl)
      if (!options.cloak) this.render()
    }

    this.image.crossOrigin = ''
    this.image.src = options.src
  }
}
