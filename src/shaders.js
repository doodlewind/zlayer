const vsSource = `
  attribute vec4 aVertexPosition;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;
  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`

const fsSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Error compiling shaders', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

const initShaderProgram = (gl, vsSource, fsSource) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.warn(
      'Error init shader program', gl.getProgramInfoLog(shaderProgram)
    )
    return null
  }

  return shaderProgram
}

export const initProgram = (gl) => {
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(
        shaderProgram, 'aVertexPosition'
      )
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram, 'uProjectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(
        shaderProgram, 'uModelViewMatrix'
      )
    }
  }
  return programInfo
}
