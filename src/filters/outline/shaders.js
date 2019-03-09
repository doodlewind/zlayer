import { initShaderProgram, basicVS } from '../../utils/index.js'

const outlineFS = `
precision highp float;
uniform sampler2D sampler;
uniform vec2 textureSize; 
varying highp vec2 vTexCoord;
float outlineSize = 1.0;
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
  if (a == 1.0) {
    stroke = 1;
  }
  return stroke;
}

void main() {
  vec4 px = texture2D(sampler, vec2(vTexCoord.x, vTexCoord.y));
  if (px.a == 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }

  int strokeCount = 0;
  for (float i = 0.0; i <= 360.0; i += 45.0) {
    strokeCount += getIsStrokeWithAngel(i);
  }

  if (strokeCount > 0) {
    px = outlineColor;
  }

  gl_FragColor = px;
}
`

export const initShaders = gl => {
  const program = initShaderProgram(gl, basicVS, outlineFS)
  const strokeShader = {
    program: program,
    attributes: {
      position: gl.getAttribLocation(program, 'position'),
      texCoord: gl.getAttribLocation(program, 'texCoord')
    },
    uniforms: {
      textureSize: gl.getUniformLocation(program, 'textureSize'),
      projectionMatrix: gl.getUniformLocation(
        program, 'projectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(
        program, 'modelViewMatrix'
      )
    }
  }
  return [strokeShader]
}
