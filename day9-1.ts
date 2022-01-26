import data from './input/input9'

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

const getRiskLevel = (data: string[]) => {
  const levelsGrid: number[][] = []

  // Convert the input strings to a 2D array of numbers
  for (let row of data) {
    let lineOfNumbers: number[] = []
    
    row.split("").forEach(letter => {
      lineOfNumbers.push(parseInt(letter, 10))
    })

    levelsGrid.push(lineOfNumbers)
  }

  // Loop through each cell and determine if it's all low point
  // by checking its neighbors. Track the low points by pushing them
  // to this array.
  let lowPointValues: number[] = []

  for (let y = 0; y < levelsGrid.length; y++) {
    for (let x = 0; x < levelsGrid[0].length; x++) {
      const cellLevel = levelsGrid[y][x]

      // If the value is undefined, the "out of bounds" areas should
      // be considered "higher" aka `Infinity` so that the cell
      // can still be considered a low spot.
      const above = levelsGrid[y-1]?.[x] ?? Infinity
      const below = levelsGrid[y+1]?.[x] ?? Infinity
      const right = levelsGrid[y]?.[x+1] ?? Infinity
      const left = levelsGrid[y]?.[x-1] ?? Infinity

      // If the value is 
      if (cellLevel < above &&
        cellLevel < below &&
        cellLevel < right &&
        cellLevel < left) {

        // low point found
        lowPointValues.push(cellLevel)
      }
    }
  }

  // The risk level is the low point value + 1.
  // So, add up all the low points and add 1 to them to find the sum of risk levels.
  console.log(lowPointValues.reduce((a, b) => a + b + 1, 0))
}

getRiskLevel(data.split('\n'))