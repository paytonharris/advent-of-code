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

const calculate = (inputData: string) => {
  const commands = inputData.split('\n').filter(a => a !== '')

  let depth = 0
  let horizontalPosition = 0
  let aim = 0

  for (let command of commands) {
    const splitCommand = command.split(' ')

    if (splitCommand.length !== 2) {
      throw 'Invalid input'
    }

    const direction = splitCommand[0]
    const distance = parseInt(splitCommand[1], 10)

    switch (direction) {
      case 'forward':
        horizontalPosition += distance
        depth += distance * aim
        break;
      case 'down':
        aim += distance
        break;
      case 'up':
        aim -= distance
        break;
    }
  }

  console.log(depth * horizontalPosition)
}

try {
  calculate(data)
} catch (error) {
  console.error(error)
}