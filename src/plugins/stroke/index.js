import { initProgram } from './shaders'
import { initBuffer } from './buffer'
import { initTexture } from './texture'
import { initFramebufferObject } from './fbo'
import { render } from './render'

const StrokePlugin = {
  initProgram,
  initBuffer,
  initTexture,
  initFramebufferObject,
  render
}

export default StrokePlugin
