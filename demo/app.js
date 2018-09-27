/* eslint-env browser */
import { Layer } from '../src/layer'
import {
  KernelFilter,
  LanczosFilter,
  StrokeFilter,
  getUSMKernel
} from '../src/filters'
import lennaSrc from './lenna.gif'
import moireSrc from './moire-test.png'

console.clear()
const src = localStorage.src || (localStorage.moire ? moireSrc : lennaSrc)
const cloak = !!localStorage.cloak
const baseConf = { src, cloak, bleeding: 10 }

window.layers = [
  new Layer(document.getElementById('canvas-kernel'), {
    ...baseConf, filter: KernelFilter, kernel: getUSMKernel(1)
  }),
  new Layer(document.getElementById('canvas-stroke'), {
    ...baseConf, filter: StrokeFilter
  }),
  new Layer(document.getElementById('canvas-resize-base'), {
    ...baseConf, filter: KernelFilter, width: 100, height: 100
  }),
  new Layer(document.getElementById('canvas-resize-lanczos'), {
    ...baseConf, filter: LanczosFilter, width: 100, height: 100
  })
]
document.getElementById('img-container').innerHTML = `<img src="${src}"/>`
