const vsSource = `
  attribute vec4 aPosition;
  attribute vec2 aTexCoord;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;
  varying highp vec2 vTexCoord;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
    vTexCoord = aTexCoord;
  }
`

const fsSource = `
  varying highp vec2 vTexCoord;
  uniform sampler2D uSampler;

  void main() {
    gl_FragColor = texture2D(uSampler, vTexCoord);
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
  const program = initShaderProgram(gl, vsSource, fsSource)
  const programInfo = {
    program,
    attributes: {
      position: gl.getAttribLocation(program, 'aPosition'),
      texCoord: gl.getAttribLocation(program, 'aTexCoord')
    },
    uniforms: {
      projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix')
    }
  }
  return programInfo
}
