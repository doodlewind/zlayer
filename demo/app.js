import { Layer } from '../src/layer'
import url from './lenna.gif'

console.clear()
const el = document.getElementById('container')
const layer = new Layer(el, { url, bleeding: 10 })
layer.render()
window.layer = layer
