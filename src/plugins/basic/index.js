import { initProgram } from './shaders'
import { initBuffer } from './buffer'
import { initTexture } from './texture'
import { render } from './render'

const BasicPlugin = {
  initProgram,
  initBuffer,
  initTexture,
  render
}

export default BasicPlugin