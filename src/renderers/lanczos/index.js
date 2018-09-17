import { initShaders } from './shaders'
import { initBuffer, initTexture } from '../../utils'
import { render } from './render'

const LanczosRenderer = {
  initShaders,
  initBuffer,
  initTexture,
  render
}

export default LanczosRenderer
