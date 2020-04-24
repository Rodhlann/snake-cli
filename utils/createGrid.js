const createGrid = (h, w) => {
  const grid = []
  for(let i = 0; i < h; i++) {
    grid.push([])
    for(let j = 0; j < w; j++) {
      grid[i].push([])
      grid[i][j] = 0
    }
  }
  return grid
}

module.exports = {
  createGrid,
}
