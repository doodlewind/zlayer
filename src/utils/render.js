import { create, ortho, rotate } from './math'
import { initBuffer } from './buffer'
import { initTexture } from './texture'
import { initFramebufferObject } from './fbo'

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

export const drawPlane = (gl, w, h, shader, buffer) => {
  const { projectionMatrix, modelViewMatrix } = initMats(w, h)
  const FSIZE = Float32Array.BYTES_PER_ELEMENT
  const { program, attributes, uniforms } = shader

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.positions)

  const { position, texCoord } = attributes
  // Set vertex positions.
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE * 4, 0)
  gl.enableVertexAttribArray(position)
  // Set texture coords.
  gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  gl.enableVertexAttribArray(texCoord)

  gl.uniformMatrix4fv(uniforms.projectionMatrix, false, projectionMatrix)
  gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, modelViewMatrix)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

export const drawBledTexture = (gl, options, shader, image) => {
  const { width, height, bledWidth, bledHeight } = options
  const buffer = initBuffer(gl, width, height)
  const texture = initTexture(gl, image)
  const fbo = initFramebufferObject(gl, bledWidth, bledHeight)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer)
  gl.viewport(0, 0, bledWidth, bledHeight)
  clearGL(gl)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  drawPlane(gl, bledWidth, bledHeight, shader, buffer)
  return fbo.texture
}
