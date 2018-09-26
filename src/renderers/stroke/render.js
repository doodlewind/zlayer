import { clearGL, initMats } from '../../utils'

const drawPlane = (gl, w, h, shader, buffer) => {
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

  gl.uniform2fv(uniforms.textureSize, [w, h])
  gl.uniformMatrix4fv(uniforms.projectionMatrix, false, projectionMatrix)
  gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, modelViewMatrix)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

export function render (texture) {
  const { options, gl, shaders } = this
  const { renderer, bledWidth, bledHeight } = options
  const { initBuffer } = renderer

  const buffer = initBuffer(gl, bledWidth, bledHeight)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, bledWidth, bledHeight)
  clearGL(gl)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  drawPlane(gl, bledWidth, bledHeight, shaders[0], buffer)
}
