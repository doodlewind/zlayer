import { initShaders } from './shaders'
import { initBuffer, initTexture, initFramebufferObject } from '../../utils'
import { render } from './render'

const StrokeFilter = {
  initShaders,
  initBuffer,
  initTexture,
  initFramebufferObject,
  render
}

export default StrokeFilter
