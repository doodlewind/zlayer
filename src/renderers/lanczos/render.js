import { clearGL, initMats } from '../../utils'

export function render () {
  const { options, gl, shaders, image } = this
  const { renderer, width, height, bledWidth, bledHeight } = options
  const { initBuffer, initTexture } = renderer

  this.buffer = initBuffer(gl, width, height)
  this.texture = initTexture(gl, image)
  clearGL(gl)

  const { projectionMatrix, modelViewMatrix } = initMats(bledWidth, bledHeight)
  const FSIZE = Float32Array.BYTES_PER_ELEMENT
  const { program, attributes, uniforms } = shaders[0]

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.positions)

  const { position, texCoord } = attributes
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE * 4, 0)
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  gl.enableVertexAttribArray(texCoord)

  gl.uniformMatrix4fv(uniforms.projectionMatrix, false, projectionMatrix)
  gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, modelViewMatrix)

  const delta = [1 / width, 0]
  const taps = new Float32Array([
    0.6079271018540267,
    3.223762155880875e-17,
    -0.13509491152311703,
    -1.611881077940438e-17,
    0.02431708407416106,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ])
  gl.uniform2fv(uniforms.delta, delta)
  gl.uniform1fv(uniforms.taps, taps)

  console.time('lanzos')
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  console.timeEnd('lanzos')
}
