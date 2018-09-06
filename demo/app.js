/* eslint-env browser */
import { Layer } from '../src/layer'
import plugin from '../src/plugins/stroke'
import defaultSrc from './moire-test.png'
const src = localStorage.src || defaultSrc

console.clear()
const el = document.getElementById('canvas')
const layer = new Layer(el, { src, plugin, bleeding: 10 })
window.layer = layer
