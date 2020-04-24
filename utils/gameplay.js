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
  grid.forEach((c, i) => {
    c.forEach((r, j) => {
      grid[i][j] = 0
    })
  })

  grid[apple[0]][apple[1]] = 2

  player.splice(points + 1, player.length)
  player.forEach(s => grid[s[0]][s[1]] = 1)

  process.stdout.write(' '.padEnd(gridW + 1, '=') + '\n')
  grid.forEach(r => {
    process.stdout.write('|')
    r.forEach(c => {
      switch(c) {
      case(1):
        process.stdout.write('#')
        break
      case(2):
        process.stdout.write('*')
        break
      default:
        process.stdout.write(' ')
        break
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
