/* eslint-env browser */
import { Layer } from '../src/layer'
import {
  KernelFilter,
  StrokeFilter,
  getUSMKernel
} from '../src/filters'
import defaultSrc from './lenna.gif'

console.clear()
const src = localStorage.src || defaultSrc
const cloak = !!localStorage.cloak
const baseConf = { src, cloak, bleeding: 10 }

window.layers = [
  new Layer(document.getElementById('canvas-kernel'), {
    ...baseConf, filter: KernelFilter, kernel: getUSMKernel(1)
  }),
  new Layer(document.getElementById('canvas-stroke'), {
    ...baseConf, filter: StrokeFilter
  })
]
document.getElementById('img-container').innerHTML = `<img src="${src}"/>`
