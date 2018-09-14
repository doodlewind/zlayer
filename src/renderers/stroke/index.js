import { initShaders } from './shaders'
import { initBuffer, initTexture } from '../../utils'
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
