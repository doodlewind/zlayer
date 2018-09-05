import { Layer } from '../src/layer'
import plugin from '../src/plugins/stroke'
import url from './moire-test.png'

console.clear()
const el = document.getElementById('container')
const layer = new Layer(el, { url, plugin, bleeding: 10 })
window.layer = layer
