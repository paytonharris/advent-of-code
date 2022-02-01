import { data, moreData } from './input/input11';
var colors = require('colors');

// This solution shows an animation in the console with how the values spread to
// others and light up. That's why there are async await, and sleep calls. 

const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

let octoGrid: number[][] = []

const incrementOcto = async (x: number, y: number) => {
  if (octoGrid[y] !== undefined && octoGrid[y][x] !== undefined) {
    octoGrid[y][x]++

    // When the value is 10, it means it's the first time during this step the value went over 9.
    // If we simply checked for cell > 9, it would repeat in a cycle forever.
    if (octoGrid[y][x] === 10) {
      // printWithColor(octoGrid)
      
      // await sleep(10)

      await incrementOcto(x, y+1)
      await incrementOcto(x, y-1)
      await incrementOcto(x+1, y)
      await incrementOcto(x+1, y+1)
      await incrementOcto(x+1, y-1)
      await incrementOcto(x-1, y)
      await incrementOcto(x-1, y+1)
      await incrementOcto(x-1, y-1)
    }
  }
}

const countFlashes = async (data: string[]) => {  
  for (let row of data) {
    let lineOfNumbers: number[] = []
    
    row.split("").forEach(letter => {
      lineOfNumbers.push(parseInt(letter, 10))
    })

    octoGrid.push(lineOfNumbers)
  }
  
  const doNextStep = async (step: number = 0) => {

    // Increase each spot by 1, and propagate outward if any go over 9.
    for (let y = 0; y < octoGrid.length; y++) {
      for (let x = 0; x < octoGrid[0].length; x++) {
        await incrementOcto(x, y)
      }
    }

    // After all the chain reactions are over, find any above 9 and set them back to 0.
    let countAbove9 = 0

    for (let y = 0; y < octoGrid.length; y++) {
      for (let x = 0; x < octoGrid[0].length; x++) {
        if (octoGrid[y][x] > 9) {
          countAbove9++
          octoGrid[y][x] = 0
        }
      }
    }

    // If every single grid point glowed, print the step it's on and exit.
    if (countAbove9 === octoGrid.length * octoGrid[0].length) {
      console.log(step + 1)
      process.exit(0)
    } else {
      // Otherwise, continue looping until they all glow at once.
      doNextStep(step + 1)
    }
  }

  // Start stepping through
  doNextStep(0)
}

countFlashes(data.split('\n'))