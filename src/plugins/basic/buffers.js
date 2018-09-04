export function initBuffers (gl, width, height) {
  const [hW, hH] = [width / 2, height / 2]
  const positions = new Float32Array([
    hW, hH, 1.0, 1.0,
    -hW, hH, 0.0, 1.0,
    hW, -hH, 1.0, 0.0,
    -hW, -hH, 0.0, 0.0
  ])

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  return {
    positions: positionBuffer
  }
}
