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

const fsFBOSource = `
  uniform sampler2D uSampler;
  varying highp vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(uSampler, vTexCoord);
  }
`

// See https://blog.csdn.net/zhenyu5211314/article/details/51781894
const fsStrokeSource = `
precision highp float;
uniform sampler2D uSampler;
uniform vec2 uTextureSize; 
varying highp vec2 vTexCoord;

float outlineSize = 10.0;
vec4 outlineColor = vec4(1.0, 0.0, 0.0, 1.0);

int getIsStrokeWithAngel(float angel) {
  int stroke = 0;
  float rad = angel * 0.01745329252; // Magic number for PI / 180
  float a = texture2D(
    uSampler,
    vec2(
      vTexCoord.x + outlineSize * cos(rad) / uTextureSize.x,
      vTexCoord.y + outlineSize * sin(rad) / uTextureSize.y
    )
  ).a;

  if (a >= 0.5) {
    stroke = 1;
  }
  return stroke;
}

void main() {
  vec4 px = texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y));

  if (px.a >= 0.8) {
    gl_FragColor = px;
    return;
  }

  int strokeCount = 0;
  for (float i = 0.0; i <= 330.0; i += 5.0) {
    strokeCount += getIsStrokeWithAngel(i);
  }

  if (strokeCount > 0) {
    px = outlineColor;
  }

  gl_FragColor = px;
}
`

export const initShaders = gl => {
  const fboProgram = initShaderProgram(gl, vsSource, fsFBOSource)
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
      textureSize: gl.getUniformLocation(strokeProgram, 'uTextureSize'),
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
