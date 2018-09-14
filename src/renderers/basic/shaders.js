import { initShaderProgram } from '../../utils'

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

export const initShaders = gl => {
  const program = initShaderProgram(gl, vsSource, fsSource)
  const shader = {
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
  return [shader]
}
