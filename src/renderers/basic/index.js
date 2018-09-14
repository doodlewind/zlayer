import { initShaders } from './shaders'
import { initBuffer, initTexture } from '../../utils'
import { render } from './render'

const BasicRenderer = {
  initShaders,
  initBuffer,
  initTexture,
  render
}

export default BasicRenderer
