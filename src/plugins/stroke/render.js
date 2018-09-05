import { create, ortho, rotate } from '../../math'

const drawPlane = (gl, w, h, programInfo, buffer) => {
  const projectionMatrix = create()
  ortho(projectionMatrix, -w / 2, w / 2, h / 2, -h / 2, -1, 1)

  const modelViewMatrix = create()

  const angle = Math.PI / 180 * 0 // Math.PI / 180 * deg
  rotate(modelViewMatrix, modelViewMatrix, angle, [0.0, 0.0, 1.0])

  const FSIZE = Float32Array.BYTES_PER_ELEMENT

  const { program, attributes, uniforms } = programInfo
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

export const render = (gl, options, programInfo, buffer, texture, fbo) => {
  const { plugin, bledWidth, bledHeight } = options

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer)
  gl.viewport(0, 0, bledWidth, bledHeight)
  gl.clearColor(0.2, 0.2, 0.4, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  drawPlane(gl, bledWidth, bledHeight, programInfo, buffer)

  const { initBuffer } = plugin
  const newBuffer = initBuffer(gl, bledWidth, bledHeight)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, bledWidth, bledWidth)
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, fbo.texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  drawPlane(gl, bledWidth, bledHeight, programInfo, newBuffer)
}
