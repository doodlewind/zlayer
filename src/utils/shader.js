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

export const basicVS = `
  attribute vec4 position;
  attribute vec2 texCoord;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  varying highp vec2 vTexCoord;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * position;
    vTexCoord = texCoord;
  }
`

export const basicFS = `
  uniform sampler2D sampler;
  varying highp vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(sampler, vTexCoord);
  }
`

export const initBasicShader = gl => {
  const fboProgram = initShaderProgram(gl, basicVS, basicFS)
  const fboShader = {
    program: fboProgram,
    attributes: {
      position: gl.getAttribLocation(fboProgram, 'position'),
      texCoord: gl.getAttribLocation(fboProgram, 'texCoord')
    },
    uniforms: {
      projectionMatrix: gl.getUniformLocation(fboProgram, 'projectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(fboProgram, 'modelViewMatrix')
    }
  }
  return fboShader
}

export const initShaderProgram = (gl, vsSource, fsSource) => {
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
