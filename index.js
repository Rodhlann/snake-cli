const { createGrid } = require('./utils/createGrid')
const { getRandomInt } = require('./utils/getRandomInt')
const {
  outOfBounds,
  playerSelfCollision,
  playerAppleCollision,
  updateDirection,
  getNextTile,
  updateGrid,
} = require('./utils/gameplay')
const readline = require('readline')
const { clearScreen } = require('./utils/clearScreen')

module.exports = () => {
  let keyCode

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', (_, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit()
    } else {
      keyCode = key.name
    }
  })

  let gameOver = false
  let direction = 0
  let points = 0
  let apple = undefined
  const player = [[0, 0]]
  const gridH = 10
  const gridW = 20

  const grid = createGrid(gridH, gridW)

  clearScreen()
  process.stdout.write('\u001B[?25l')
  const loop = () => {
    process.stdout.cursorTo(0, 0)
    process.stdout.write(`Points: ${points}\n`)

    direction = updateDirection(keyCode, direction)
    const nextTile = getNextTile(direction, player)

    if (playerSelfCollision(player, nextTile) || outOfBounds(nextTile, gridH, gridW)) {
      gameOver = true
    }

    if (!gameOver) {
      player.splice(0, 0, nextTile)

      if (playerAppleCollision(player, apple)) {
        points++
        apple = undefined
      }

      if (!apple) {
        apple = [getRandomInt(gridH), getRandomInt(gridW - 1)]
      }

      updateGrid(grid, apple, player, points, gridW)
    } else {
      clearScreen()
      process.stdout.write(`Points: ${points}\n`)
      process.stdout.write('Game Over!')
      process.stdout.write('\u001B[?25h')
      clearInterval(interval)
      process.exit()
    }
  }

  const interval = setInterval(loop, 200)
}

