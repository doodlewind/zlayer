export function initBuffers (gl, width, height) {
  const [hW, hH] = [width / 2, height / 2]
  const positions = [hW, hH, -hW, hH, hW, -hH, -hW, -hH]
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  return {
    position: positionBuffer
  }
}
