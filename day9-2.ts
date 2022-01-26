import data from './input/input9'

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

interface Point {
  value: number;
  traversed: boolean;
}

const getRiskLevel = (data: string[]) => {
  const levelsGrid: Point[][] = []
  
  // Convert the input strings to a 2D array of Points
  for (let row of data) {
    let lineOfNumbers: Point[] = []
    
    row.split("").forEach(letter => {
      lineOfNumbers.push({ value: parseInt(letter, 10), traversed: false })
    })
    
    levelsGrid.push(lineOfNumbers)
  }
  
  // This recursive function will traverse all the surrounding points.
  // It immediately marks a cell as "traversed" so that it doesn't get
  // checked twice, then finds the area of all the cells around it and
  // adds them together.
  const traverseBasin = (x: number, y: number): number => {
    if (levelsGrid[y] === undefined ||
      levelsGrid[y][x] === undefined ||
      levelsGrid[y][x].value === 9 ||
      levelsGrid[y][x].traversed) {
      return 0
    } else {
      levelsGrid[y][x].traversed = true

      const aboveArea = traverseBasin(x, y-1)
      const belowArea = traverseBasin(x, y+1)
      const rightArea = traverseBasin(x+1, y)
      const leftArea = traverseBasin(x-1, y)

      return 1 + aboveArea + belowArea + rightArea + leftArea
    }
  }

  // Look through all the points and find the number of all the cells
  // around it that are not 9.
  let basinSizes: number[] = []

  for (let y = 0; y < levelsGrid.length; y++) {
    for (let x = 0; x < levelsGrid[0].length; x++) {

      // traverseBasin returns 0 if the cell has already be traversed
      // or if the cell is a 9. It will only return above 0 if it found
      // a new basin.
      const basinSize = traverseBasin(x, y)

      if (basinSize > 0) {
        basinSizes.push(basinSize)
      }
    }
  }

  // Sort them and multiply the highest 3 together to find the answer
  basinSizes = basinSizes.sort((a, b) => b - a)
  console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])
}

getRiskLevel(data.split('\n'))