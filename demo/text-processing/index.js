export const parseBitmap = canvas => {
  const gl = canvas.getContext('webgl')
  const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4)
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] !== 0) {
      console.log(pixels[i], i)
    }
  }
  window.pixels = pixels
}
