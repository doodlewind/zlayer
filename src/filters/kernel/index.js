import { initShaders } from './shaders.js'
import { render } from './render.js'

export const KernelFilter = { initShaders, render }

export const getUSMKernel = (amount = 1) => {
  const original = [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0
  ]
  const blurred = [
    1, 2, 1,
    2, 4, 2,
    1, 2, 1
  ].map(x => x / 16)

  return original.map((o, i) => o + (o - blurred[i]) * amount)
}
