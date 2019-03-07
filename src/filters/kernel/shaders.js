import { initShaderProgram, basicVS } from '../../utils/index.js'

const kernelFS = `
precision highp float;

uniform sampler2D sampler;
uniform vec2 textureSize;
uniform float kernel[9];
uniform float kernelWeight;

varying vec2 vTexCoord;

void main() {
   vec2 onePixel = vec2(1.0, 1.0) / textureSize;
   vec4 colorSum =
     texture2D(sampler, vTexCoord + onePixel * vec2(-1, -1)) * kernel[0] +
     texture2D(sampler, vTexCoord + onePixel * vec2(0, -1)) * kernel[1] +
     texture2D(sampler, vTexCoord + onePixel * vec2(1, -1)) * kernel[2] +
     texture2D(sampler, vTexCoord + onePixel * vec2(-1, 0)) * kernel[3] +
     texture2D(sampler, vTexCoord + onePixel * vec2(0, 0)) * kernel[4] +
     texture2D(sampler, vTexCoord + onePixel * vec2(1, 0)) * kernel[5] +
     texture2D(sampler, vTexCoord + onePixel * vec2(-1, 1)) * kernel[6] +
     texture2D(sampler, vTexCoord + onePixel * vec2(0, 1)) * kernel[7] +
     texture2D(sampler, vTexCoord + onePixel * vec2(1, 1)) * kernel[8];

   // Divide the sum by the weight but just use rgb.
   gl_FragColor = vec4(
    (colorSum / kernelWeight).rgb, texture2D(sampler, vTexCoord).a
  );
}
`

export const initShaders = gl => {
  const strokeProgram = initShaderProgram(gl, basicVS, kernelFS)
  const strokeShader = {
    program: strokeProgram,
    attributes: {
      position: gl.getAttribLocation(strokeProgram, 'position'),
      texCoord: gl.getAttribLocation(strokeProgram, 'texCoord')
    },
    uniforms: {
      textureSize: gl.getUniformLocation(strokeProgram, 'textureSize'),
      kernel: gl.getUniformLocation(strokeProgram, 'kernel'),
      kernelWeight: gl.getUniformLocation(strokeProgram, 'kernelWeight'),
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
