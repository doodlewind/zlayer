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
  precision highp float;
  varying highp vec2 vTexCoord;
  uniform sampler2D uTexture;
  uniform vec2 uDelta;
  uniform float uTaps[16];

  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float sum = 1.0;
    color += texture2D(uTexture, vTexCoord + 1.0 * uDelta) * uTaps[0];
    color += texture2D(uTexture, vTexCoord - 1.0 * uDelta) * uTaps[0];
    sum += 2.0 * uTaps[0];
    color += texture2D(uTexture, vTexCoord + 2.0 * uDelta) * uTaps[1];
    color += texture2D(uTexture, vTexCoord - 2.0 * uDelta) * uTaps[1];
    sum += 2.0 * uTaps[1];
    color += texture2D(uTexture, vTexCoord + 3.0 * uDelta) * uTaps[2];
    color += texture2D(uTexture, vTexCoord - 3.0 * uDelta) * uTaps[2];
    sum += 2.0 * uTaps[2];
    color += texture2D(uTexture, vTexCoord + 4.0 * uDelta) * uTaps[3];
    color += texture2D(uTexture, vTexCoord - 4.0 * uDelta) * uTaps[3];
    sum += 2.0 * uTaps[3];
    color += texture2D(uTexture, vTexCoord + 5.0 * uDelta) * uTaps[4];
    color += texture2D(uTexture, vTexCoord - 5.0 * uDelta) * uTaps[4];
    sum += 2.0 * uTaps[4];
    color += texture2D(uTexture, vTexCoord + 6.0 * uDelta) * uTaps[5];
    color += texture2D(uTexture, vTexCoord - 6.0 * uDelta) * uTaps[5];
    sum += 2.0 * uTaps[5];
    color += texture2D(uTexture, vTexCoord + 7.0 * uDelta) * uTaps[6];
    color += texture2D(uTexture, vTexCoord - 7.0 * uDelta) * uTaps[6];
    sum += 2.0 * uTaps[6];
    color += texture2D(uTexture, vTexCoord + 8.0 * uDelta) * uTaps[7];
    color += texture2D(uTexture, vTexCoord - 8.0 * uDelta) * uTaps[7];
    sum += 2.0 * uTaps[7];
    color += texture2D(uTexture, vTexCoord + 9.0 * uDelta) * uTaps[8];
    color += texture2D(uTexture, vTexCoord - 9.0 * uDelta) * uTaps[8];
    sum += 2.0 * uTaps[8];
    color += texture2D(uTexture, vTexCoord + 10.0 * uDelta) * uTaps[9];
    color += texture2D(uTexture, vTexCoord - 10.0 * uDelta) * uTaps[9];
    sum += 2.0 * uTaps[9];
    color += texture2D(uTexture, vTexCoord + 11.0 * uDelta) * uTaps[10];
    color += texture2D(uTexture, vTexCoord - 11.0 * uDelta) * uTaps[10];
    sum += 2.0 * uTaps[10];
    color += texture2D(uTexture, vTexCoord + 12.0 * uDelta) * uTaps[11];
    color += texture2D(uTexture, vTexCoord - 12.0 * uDelta) * uTaps[11];
    sum += 2.0 * uTaps[11];
    color += texture2D(uTexture, vTexCoord + 13.0 * uDelta) * uTaps[12];
    color += texture2D(uTexture, vTexCoord - 13.0 * uDelta) * uTaps[12];
    sum += 2.0 * uTaps[12];
    color += texture2D(uTexture, vTexCoord + 14.0 * uDelta) * uTaps[13];
    color += texture2D(uTexture, vTexCoord - 14.0 * uDelta) * uTaps[13];
    sum += 2.0 * uTaps[13];
    color += texture2D(uTexture, vTexCoord + 15.0 * uDelta) * uTaps[14];
    color += texture2D(uTexture, vTexCoord - 15.0 * uDelta) * uTaps[14];
    sum += 2.0 * uTaps[14];
    color += texture2D(uTexture, vTexCoord + 16.0 * uDelta) * uTaps[15];
    color += texture2D(uTexture, vTexCoord - 16.0 * uDelta) * uTaps[15];
    sum += 2.0 * uTaps[15];
    gl_FragColor = color / sum;
  }  
`

export function initShaders (gl) {
  const program = initShaderProgram(gl, vsSource, fsSource)
  const shader = {
    program,
    attributes: {
      position: gl.getAttribLocation(program, 'aPosition'),
      texCoord: gl.getAttribLocation(program, 'aTexCoord')
    },
    uniforms: {
      delta: gl.getUniformLocation(program, 'uDelta'),
      taps: gl.getUniformLocation(program, 'uTaps'),
      projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix')
    }
  }
  return [shader]
}
