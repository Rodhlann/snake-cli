const outOfBounds = (nextTile, gridH, gridW) => nextTile[0] < 0 || nextTile[0] === gridH || nextTile[1] < 0 || nextTile[1] === gridW
const playerSelfCollision = (player, nextTile) => JSON.stringify(player).includes(JSON.stringify(nextTile))
const playerAppleCollision = (player, apple) => JSON.stringify(player[0]) === JSON.stringify(apple)

const updateDirection = (keyCode, direction) => {
  switch(keyCode) {
  case 'right':
  case 'd':
    return direction === 2 ? 2 : 3
  case 'left':
  case 'a':
    return direction === 3 ? 3 : 2
  case 'up':
  case 'w':
    return direction === 0 ? 0 : 1
  case 'down':
  case 's':
    return direction === 1 ? 1 : 0
  default:
    return direction
  }
}

const getNextTile = (direction, player) => {
  switch(direction) {
  case 0:
    return [player[0][0] + 1, player[0][1]]
  case 1:
    return [player[0][0] - 1, player[0][1]]
  case 2:
    return [player[0][0], player[0][1] - 1]
  case 3:
    return [player[0][0], player[0][1] + 1]
  }
}

const updateGrid = (grid, apple, player, points, gridW) => {
  player.splice(points + 1, player.length)

  process.stdout.write(' '.padEnd(gridW + 1, '=') + '\n')
  grid.forEach((c, i) => {
    process.stdout.write('|')
    c.forEach((r, j) => {
      if (i === apple[0] && j === apple[1]) {
        process.stdout.write('*')
      } else if (player.some(e => JSON.stringify(e) === `[${i},${j}]`)) {
        process.stdout.write('#')
      } else {
        process.stdout.write(' ')
      }
    })
    process.stdout.write('|\n')
  })
  process.stdout.write(' '.padEnd(gridW + 1, '=') + '\n')
}

module.exports = {
  outOfBounds,
  playerSelfCollision,
  playerAppleCollision,
  updateDirection,
  getNextTile,
  updateGrid,
}
