import { initShaders } from './shaders'
import { initBuffer } from './buffer'
import { initTexture } from './texture'
import { initFramebufferObject } from './fbo'
import { render } from './render'

const StrokeRenderer = {
  initShaders,
  initBuffer,
  initTexture,
  initFramebufferObject,
  render
}

export default StrokeRenderer
