import { create, ortho, rotate } from '../../math'

export const render = (gl, canvas, programInfo, buffers) => {
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const projectionMatrix = create()
  ortho(
    projectionMatrix,
    -canvas.width / 2,
    canvas.width / 2,
    canvas.height / 2,
    -canvas.height / 2,
    -1,
    1
  )

  const modelViewMatrix = create()

  const angle = Math.PI / 180 * 0 // Math.PI / 180 * deg
  rotate(modelViewMatrix, modelViewMatrix, angle, [0.0, 0.0, 1.0])

  const FSIZE = Float32Array.BYTES_PER_ELEMENT

  const { program, attributes, uniforms } = programInfo
  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions)

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
