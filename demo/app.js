/* eslint-env browser */
import { Layer } from '../src/layer'
import basicRenderer from '../src/renderers/basic'
import lanczosRenderer from '../src/renderers/lanczos'
import defaultSrc from './moire-test.png'
const src = localStorage.src || defaultSrc
const cloak = !!localStorage.cloak

console.clear()
const baseOption = {
  src, cloak, width: 100, height: 100, bleeding: 10
}
const basicLayer = new Layer(document.getElementById('layer-basic'), {
  ...baseOption, renderer: basicRenderer
})
const lanczosLayer = new Layer(document.getElementById('layer-lanczos'), {
  ...baseOption, renderer: lanczosRenderer
})
window.layers = [basicLayer, lanczosLayer]
