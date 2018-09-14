import { initShaders } from './shaders'
import { initBuffer } from './buffer'
import { initTexture } from './texture'
import { render } from './render'

const BasicRenderer = {
  initShaders,
  initBuffer,
  initTexture,
  render
}

export default BasicRenderer
