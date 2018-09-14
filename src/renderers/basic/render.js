import { clearGL, initMats } from '../../utils'

export function render () {
  const { options, gl, shaders, image } = this
  const { renderer, width, height, bledWidth, bledHeight } = options
  const { initBuffer, initTexture } = renderer

  // Before first pass, use position without bleeding.
  this.buffer = initBuffer(gl, width, height)
  // Async render on image loaded.
  this.texture = initTexture(gl, image)

  clearGL(gl)

  const { projectionMatrix, modelViewMatrix } = initMats(bledWidth, bledHeight)
  const FSIZE = Float32Array.BYTES_PER_ELEMENT
  const { program, attributes, uniforms } = shaders[0]

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.positions)

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
