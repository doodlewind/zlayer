import { create, ortho, translate, rotate, rotateZ } from './math'

export { initShaderProgram } from './shader'
export { initBuffer } from './buffer'
export { initTexture } from './texture'
export { initFramebufferObject } from './fbo'
export { clearGL, initMats } from './render'
export const math = { create, ortho, translate, rotate, rotateZ }
