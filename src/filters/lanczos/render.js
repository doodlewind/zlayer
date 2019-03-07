import { clearGL, initMats, initFramebufferObject } from '../../utils/index.js'

const drawImage = (
  gl, w, h, shader, buffer, texture, delta
) => {
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  const { projectionMatrix, modelViewMatrix } = initMats(w, h)
  const FSIZE = Float32Array.BYTES_PER_ELEMENT
  const { program, attributes, uniforms } = shader

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.positions)

  const { position, texCoord } = attributes

  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE * 4, 0)
  gl.enableVertexAttribArray(position)

  gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  gl.enableVertexAttribArray(texCoord)

  gl.uniform2fv(uniforms.textureSize, [w, h])
  gl.uniformMatrix4fv(uniforms.projectionMatrix, false, projectionMatrix)
  gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, modelViewMatrix)

  gl.uniform2fv(uniforms.delta, delta)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

export function render (texture) {
  const { options, gl, shaders } = this
  const { filter, bledWidth, bledHeight } = options
  const { initBuffer } = filter

  const buffer = initBuffer(gl, bledWidth, bledHeight)

  const fbo = initFramebufferObject(gl, bledWidth, bledHeight)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer)
  gl.viewport(0, 0, bledWidth, bledHeight)
  clearGL(gl)
  const wDelta = [1 / bledWidth, 0]
  drawImage(gl, bledWidth, bledHeight, shaders[0], buffer, texture, wDelta)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, bledWidth, bledHeight)
  clearGL(gl)
  const hDelta = [0, 1 / bledHeight]
  drawImage(gl, bledWidth, bledHeight, shaders[0], buffer, fbo.texture, hDelta)
}
