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

const fsBasicSource = `
  uniform sampler2D uSampler;
  varying highp vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(uSampler, vTexCoord);
  }
`

const fsStrokeSource = `
  uniform sampler2D uSampler;
  uniform highp vec2 uDelta;
  varying highp vec2 vTexCoord;

  void main() {
    if (texture2D(uSampler, vTexCoord).a != 0.0) {
      gl_FragColor = texture2D(uSampler, vTexCoord);
    }
    else {
      if (texture2D(uSampler, vTexCoord + uDelta).a != 0.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      }
    }
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

export const initShaders = gl => {
  const fboProgram = initShaderProgram(gl, vsSource, fsBasicSource)
  const fboShader = {
    program: fboProgram,
    attributes: {
      position: gl.getAttribLocation(fboProgram, 'aPosition'),
      texCoord: gl.getAttribLocation(fboProgram, 'aTexCoord')
    },
    uniforms: {
      projectionMatrix: gl.getUniformLocation(fboProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(fboProgram, 'uModelViewMatrix')
    }
  }

  const strokeProgram = initShaderProgram(gl, vsSource, fsStrokeSource)
  const strokeShader = {
    program: strokeProgram,
    attributes: {
      position: gl.getAttribLocation(strokeProgram, 'aPosition'),
      texCoord: gl.getAttribLocation(strokeProgram, 'aTexCoord')
    },
    uniforms: {
      delta: gl.getUniformLocation(strokeProgram, 'uDelta'),
      projectionMatrix: gl.getUniformLocation(
        strokeProgram, 'uProjectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(
        strokeProgram, 'uModelViewMatrix'
      )
    }
  }
  return [fboShader, strokeShader]
}
