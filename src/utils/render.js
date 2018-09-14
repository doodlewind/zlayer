import { create, ortho, rotate } from './math'

export const clearGL = gl => {
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.clearDepth(1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

export const initMats = (w, h) => {
  const projectionMatrix = create()
  ortho(projectionMatrix, -w / 2, w / 2, h / 2, -h / 2, -1, 1)

  const modelViewMatrix = create()
  const angle = Math.PI / 180 * 0 // Math.PI / 180 * deg
  rotate(modelViewMatrix, modelViewMatrix, angle, [0.0, 0.0, 1.0])

  return { projectionMatrix, modelViewMatrix }
}
