import { data } from "./input/input5"

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface GridSize {
  x: number;
  y: number;
}

const parseInput = (data: string): { lines: Line[], maxX: number, maxY: number } => {
  let lines: Line[] = []
  let maxX = 0;
  let maxY = 0;

  const lineStrings = data.split('\n')

  lineStrings.forEach(lineString => {
    let line = { x1: 0, x2: 0, y1: 0, y2: 0 }

    // Convert the strings into numbers and place them into a Line object.
    const coords = lineString.split(' -> ')
    const initialPair = coords[0].split(',')
    const finalPair = coords[1].split(',')

    line.x1 = parseInt(initialPair[0], 10)
    line.y1 = parseInt(initialPair[1], 10)
    line.x2 = parseInt(finalPair[0], 10)
    line.y2 = parseInt(finalPair[1], 10)

    lines.push(line)

    // Also keep track of the highest x and y, to later initialize the grid.
    if (line.x1 > maxX) maxX = line.x1
    if (line.x2 > maxX) maxX = line.x2
    if (line.y1 > maxY) maxY = line.y1
    if (line.y2 > maxY) maxY = line.y2
  })

  return { lines, maxX, maxY }
}

const plotLinesOnGrid = (lines: Line[], gridSize: GridSize): number[][] => {
  let grid: number[][] = []

  // Initialize the grid with all 0s.
  for (let i = 0; i < gridSize.y; i++) {
    grid.push([...Array(gridSize.x)].map(x => 0))
  }

  // Plot the lines.
  for (let line of lines) {
    const { x1, x2, y1, y2 } = line
    const higherX = x1 > x2 ? x1 : x2
    const lowerX = x1 > x2 ? x2 : x1
    const higherY = y1 > y2 ? y1 : y2
    const lowerY = y1 > y2 ? y2 : y1

    if (y1 === y2) { // Horizontal line
      for (let x = lowerX; x <= higherX; x++) {
        grid[line.y1][x] += 1
      }
    } else if (x1 === x2) { // Vertical line
      for (let y = lowerY; y <= higherY; y++) {
        grid[y][line.x1] += 1
      }
    }
  }
  
  return grid
}

const countOverlaps = (grid: number[][]) => {
  let count = 0

  for (let line of grid) {
    for (let point of line) {
      if (point >= 2) count++
    }
  }

  return count
}

const printGrid = (grid: number[][]) => {
  // Print out the grid in the format like on the website, e.g.:
  
  // .......1..
  // ..1....1..
  // ..1....1..
  // .......1..
  // .112111211
  // ..........
  // ..........
  // ..........
  // ..........
  // 222111....

  for (let line of grid) {
    let lineText = line.reduce((previous, current) => {
      if (current === 0) return `${previous}.`
      return `${previous}${current}`
    }, '')

    console.log(lineText)
  }
}

const { lines, maxX, maxY } = parseInput(testInput)
const grid = plotLinesOnGrid(lines, { x: maxX + 1, y: maxY + 1 })
printGrid(grid)
const countOfOverlaps = countOverlaps(grid)

console.log(countOfOverlaps)

