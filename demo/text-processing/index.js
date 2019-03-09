export const parseBitmap = canvas => {
  const gl = canvas.getContext('webgl')
  const width = gl.drawingBufferWidth
  const height = gl.drawingBufferHeight
  const pixels = new Uint8Array(width * height * 4)
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
  const bitmap = []

  // reverse y order
  for (let i = width - 1; i >= 0; i--) {
    const row = []
    for (let j = 0; j < height; j++) {
      row.push(pixels[(i * width + j) * 4] > 0 ? 1 : 0)
    }
    bitmap.push(row)
  }

  window.bitmap = bitmap
  // copy(bitmap) in console
}
