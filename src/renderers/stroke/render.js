import { math } from '../../utils'

const drawPlane = (gl, w, h, shader, buffer) => {
  const projectionMatrix = math.create()
  math.ortho(projectionMatrix, -w / 2, w / 2, h / 2, -h / 2, -1, 1)

  const modelViewMatrix = math.create()

  const angle = Math.PI / 180 * 0 // Math.PI / 180 * deg
  math.rotate(modelViewMatrix, modelViewMatrix, angle, [0.0, 0.0, 1.0])

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

  if (uniforms.textureSize) gl.uniform2fv(uniforms.textureSize, [w, h])
  gl.uniformMatrix4fv(uniforms.projectionMatrix, false, projectionMatrix)
  gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, modelViewMatrix)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

export function render () {
  const { options, gl } = this
  const { renderer, bledWidth, bledHeight } = options
  const {
    initShaders, initBuffer, initTexture, initFramebufferObject
  } = renderer
  const shaders = initShaders(this.gl)
  // Before first pass, use position without bleeding.
  const buffer = initBuffer(this.gl, options.width, options.height)
  // Async render on image loaded.
  const texture = initTexture(this.gl, this.image)
  // Init FBO without bleeding.
  const fbo = initFramebufferObject(gl, bledWidth, bledHeight)

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer)
  gl.viewport(0, 0, bledWidth, bledHeight)
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  drawPlane(gl, bledWidth, bledHeight, shaders[0], buffer)

  const newBuffer = initBuffer(gl, bledWidth, bledHeight)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, bledWidth, bledHeight)
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, fbo.texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  drawPlane(gl, bledWidth, bledHeight, shaders[1], newBuffer)
}