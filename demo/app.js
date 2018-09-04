import { Layer } from '../src/layer'

console.clear()
const el = document.getElementById('container')
const layer = new Layer(el, { bleeding: 10 })
layer.render()
window.layer = layer
