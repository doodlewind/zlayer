import { initShaders } from './shaders'
import { initBuffer } from './buffer'
import { initTexture } from './texture'
import { render } from './render'

const BasicPlugin = {
  initShaders,
  initBuffer,
  initTexture,
  render
}

export default BasicPlugin
