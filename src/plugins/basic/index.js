import { initProgram } from './shaders'
import { initBuffers } from './buffers'
import { initTexture } from './texture'
import { render } from './render'

const BasicPlugin = {
  initProgram,
  initBuffers,
  initTexture,
  render
}

export default BasicPlugin
