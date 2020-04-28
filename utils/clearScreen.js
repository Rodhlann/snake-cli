const clearScreen = () => {
  process.stdout.cursorTo(0, 0)
  process.stdout.clearScreenDown()
}

module.exports = { clearScreen }
