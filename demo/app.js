/* eslint-env browser */
import { Layer } from '../src/layer'
import filter from '../src/filters/kernel'
import defaultSrc from './moire-test.png'
const src = localStorage.src || defaultSrc
const cloak = !!localStorage.cloak

console.clear()
const el = document.getElementById('canvas')
const layer = new Layer(el, {
  src,
  cloak,
  filter,
  kernel: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  bleeding: 10
})
window.layer = layer
