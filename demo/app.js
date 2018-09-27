/* eslint-env browser */
import { Layer } from '../src/layer'
import plugin from '../src/plugins/stroke'
import defaultSrc from './moire-test.png'
const src = localStorage.src || defaultSrc
const cloak = !!localStorage.cloak

console.clear()
const el = document.getElementById('canvas')
const layer = new Layer(el, { src, cloak, plugin, bleeding: 20 })
window.layer = layer
