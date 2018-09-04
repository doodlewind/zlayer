import { create, ortho, rotate } from './math'

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

  gl.useProgram(programInfo.program)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0
  )
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix, false, projectionMatrix
  )
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix
  )

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
