const assert = require('assert')
const { createGrid } = require('./createGrid')

const test = () => {
  const result = createGrid(2, 2)
  assert(JSON.stringify(result) === JSON.stringify([[' ', ' '], [' ', ' ']])) 
  console.info('pass!')
}

test()
