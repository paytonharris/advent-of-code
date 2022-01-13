import colors from 'colors'
import { data } from './input/input2-1';

const testInput = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`

const calculate = (inputData: string, showDebugInfo = false) => {
  const commands = inputData.split('\n').filter(a => a !== '')

  let depth = 0
  let horizontalPosition = 0
  let debugLog = ''

  for (let command of commands) {
    debugLog = ''

    const splitCommand = command.split(' ')

    if (splitCommand.length !== 2) {
      throw 'Invalid input'
    }

    const direction = splitCommand[0]
    const distance = parseInt(splitCommand[1], 10)

    switch (direction) {
      case 'forward':
        horizontalPosition += distance
        debugLog = `Forward ${distance}`.green
        break;
      case 'down':
        depth += distance
        debugLog = `Down ${distance}`.blue
        break;
      case 'up':
        depth -= distance
        debugLog = `Up ${distance}`.magenta
        break;
    }

    if (showDebugInfo) {
      console.log(debugLog)
    }
  }

  if (showDebugInfo) {
    console.log(colors.bold.underline(`Depth: ${depth}, Horizontal Position: ${horizontalPosition}`))
  }

  console.log(depth * horizontalPosition)
}

try {
  calculate(data, true)
} catch (error) {
  console.error(error)
}