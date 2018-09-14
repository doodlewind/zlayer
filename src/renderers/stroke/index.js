import { initShaders } from './shaders'
import { initBuffer, initTexture, initFramebufferObject } from '../../utils'
import { render } from './render'

const StrokeRenderer = {
  initShaders,
  initBuffer,
  initTexture,
  initFramebufferObject,
  render
}

export default StrokeRenderer
