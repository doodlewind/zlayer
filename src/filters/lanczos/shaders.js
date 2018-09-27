import { initShaderProgram, basicVS } from '../../utils'

// Simplified Lanczos filter.
// See https://github.com/BradLarson/GPUImage/issues/1800
const lanczosFS = `
precision highp float;

uniform sampler2D sampler;
uniform vec2 delta;
varying highp vec2 vTexCoord;

void main() {
  vec4 color = texture2D(sampler, vTexCoord);

  vec4 fragmentColor = texture2D(sampler, vTexCoord) * 0.38026;
  fragmentColor += texture2D(sampler, vTexCoord + 1.0 * delta) * 0.27667;
  fragmentColor += texture2D(sampler, vTexCoord - 1.0 * delta) * 0.27667;

  fragmentColor += texture2D(sampler, vTexCoord + 2.0 * delta) * 0.08074;
  fragmentColor += texture2D(sampler, vTexCoord - 2.0 * delta) * 0.08074;
  
  fragmentColor += texture2D(sampler, vTexCoord + 3.0 * delta) * -0.02612;
  fragmentColor += texture2D(sampler, vTexCoord - 3.0 * delta) * -0.02612;
  
  fragmentColor += texture2D(sampler, vTexCoord + 4.0 * delta) * -0.02143;
  fragmentColor += texture2D(sampler, vTexCoord - 4.0 * delta) * -0.02143;

  gl_FragColor = fragmentColor;
}
`

export const initShaders = gl => {
  const strokeProgram = initShaderProgram(gl, basicVS, lanczosFS)
  const strokeShader = {
    program: strokeProgram,
    attributes: {
      position: gl.getAttribLocation(strokeProgram, 'position'),
      texCoord: gl.getAttribLocation(strokeProgram, 'texCoord')
    },
    uniforms: {
      textureSize: gl.getUniformLocation(strokeProgram, 'textureSize'),
      delta: gl.getUniformLocation(strokeProgram, 'delta'),
      projectionMatrix: gl.getUniformLocation(
        strokeProgram, 'projectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(
        strokeProgram, 'modelViewMatrix'
      )
    }
  }
  return [strokeShader]
}
