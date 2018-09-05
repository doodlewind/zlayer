export const initFramebufferObject = (gl, width, height) => {
  let framebuffer, texture, depthBuffer

  const error = () => {
    if (framebuffer) gl.deleteFramebuffer(framebuffer)
    if (texture) gl.deleteTexture(texture)
    if (depthBuffer) gl.deleteRenderbuffer(depthBuffer)
    return null
  }

  framebuffer = gl.createFramebuffer()
  if (!framebuffer) {
    console.log('Failed to create frame buffer object')
    return error()
  }

  texture = gl.createTexture()
  if (!texture) {
    console.warn('Failed to create texture object')
    return error()
  }
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  // Replace depth buffer with renderbuffer object.
  depthBuffer = gl.createRenderbuffer()
  if (!depthBuffer) {
    console.warn('Failed to create renderbuffer object')
    return error()
  }
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer)
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height)

  // Attach the texture and the renderbuffer object to the FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0
  )
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer
  )

  const e = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  if (gl.FRAMEBUFFER_COMPLETE !== e) {
    console.warn('Frame buffer object is incomplete: ' + e.toString())
    return error()
  }

  // Unbind the buffer object
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.bindTexture(gl.TEXTURE_2D, null)
  gl.bindRenderbuffer(gl.RENDERBUFFER, null)

  return { framebuffer, texture }
}
