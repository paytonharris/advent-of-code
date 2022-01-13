import { data } from './input/input1-2';
import colors from 'colors'

const testInput = `
199
200
208
210
200
207
240
269
260
263
`

const calculate = (inputData: string, showDebugInfo = false) => {
  const nums = inputData.split('\n').filter(a => a !== '').map(a => parseInt(a, 10))
  
  let countOfIncreases = 0
  let previousSum: (undefined | number) = undefined
  let debugSummary = ''
  
  for (let index = 0; index <= nums.length - 3; index++) {
    const currentSum = nums[index] + nums[index + 1] + nums[index + 2]

    if (previousSum !== undefined) {

      if (currentSum > previousSum) {
        countOfIncreases++
        debugSummary = '(increased)'.blue
      } else if (currentSum === previousSum) {
        debugSummary = '(no change)'.gray
      } else {
        debugSummary = colors.gray('(decreased)')
      }
    } else {
      debugSummary = '(N/A - no previous sum)'.gray
    }

    if (showDebugInfo) {
      console.log(`${index}: ${`${currentSum}`.magenta} ${debugSummary}`)
    }

    previousSum = currentSum
  }
  
  console.log(`\nTotal Increases: ${countOfIncreases}\n`.underline.bold)
}

try {
  calculate(data, true)
} catch (error) {
  console.error(error)
}