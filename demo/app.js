import { Layer } from '../src/layer'
import plugin from '../src/plugins/stroke'
import src from './moire-test.png'

console.clear()
const el = document.getElementById('canvas')
const layer = new Layer(el, { src, plugin, bleeding: 10 })
window.layer = layer
