import { initShaderProgram, basicVS } from '../../utils/index.js'

// See https://blog.csdn.net/zhenyu5211314/article/details/51781894
const strokeFS = `
precision highp float;
uniform sampler2D sampler;
uniform vec2 textureSize; 
varying highp vec2 vTexCoord;
float outlineSize = 10.0;
vec4 outlineColor = vec4(1.0, 0.0, 0.0, 1.0);

int getIsStrokeWithAngel(float angel) {
  int stroke = 0;
  float rad = angel * 0.01745329252; // Magic number for PI / 180
  float a = texture2D(
    sampler,
    vec2(
      vTexCoord.x + outlineSize * cos(rad) / textureSize.x,
      vTexCoord.y + outlineSize * sin(rad) / textureSize.y
    )
  ).a;

  if (a >= 0.5) {
    stroke = 1;
  }
  return stroke;
}

void main() {
  vec4 px = texture2D(sampler, vec2(vTexCoord.x, vTexCoord.y));

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
  const strokeProgram = initShaderProgram(gl, basicVS, strokeFS)
  const strokeShader = {
    program: strokeProgram,
    attributes: {
      position: gl.getAttribLocation(strokeProgram, 'position'),
      texCoord: gl.getAttribLocation(strokeProgram, 'texCoord')
    },
    uniforms: {
      textureSize: gl.getUniformLocation(strokeProgram, 'textureSize'),
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
