import { boards, numbers } from "./input/input4";

interface Spot {
  number: string;
  marked: boolean;
}

const testNumbers = '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1'
const testBoards = `22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`

// Take the string and convert it to an array of 2D boards.
const getBingoBoards = (boards: string) => {
  const separatedBoards = boards.split('\n\n')

  let allBoards: Spot[][][] = [];

  separatedBoards.forEach(board => {
    const rows = board.split('\n')

    let currentBoard: Spot[][] = [];

    rows.forEach(row => {
      const splitRow = row.split(' ').filter(a => a !== '')
  
      let currentRow: Spot[] = []
      splitRow.forEach(spot => {
        currentRow.push({ number: spot, marked: false })
      })
  
      currentBoard.push(currentRow)
    })

    allBoards.push(currentBoard)
  })

  return allBoards
}

const checkIfBoardHasWon = (board: Spot[][]) => {
  let boardHasWon = false;

  // Check for a winning row / column.
  // Assume that a row is all marked, and if a value is not marked,
  // then change it be be false.
  for (let i = 0; i < board.length; i++) {
    let rowIsAllMarked = true
    let columnIsAllMarked = true

    for (let j = 0; j < board.length; j++) {
      if (!board[i][j].marked) {
        rowIsAllMarked = false
      }
      if (!board[j][i].marked) {
        columnIsAllMarked = false
      }
    }

    if (rowIsAllMarked || columnIsAllMarked) {
      boardHasWon = true;
    }
  }

  return boardHasWon
}

const getBestBoard = (boards: Spot[][][], numbersList: string): { board: Spot[][] | undefined, number: string | undefined } => {
  const splitNumbers = numbersList.split(',')

  let finalBoard: Spot[][] | undefined = undefined
  let finalNumber: string | undefined = undefined

  for (const number of splitNumbers) {

    // Mark the number on each board
    boards.forEach(board => {
      for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
          if (board[i][j].number === number) {
            board[i][j].marked = true;
          }
        }
      }
    })

    // Check if any boards won
    for (const board of boards) {
      if (checkIfBoardHasWon(board)) {

        // Leaving this here to investigate a strange behavior in the value of board later.
        // if (finalNumber === undefined) {
        //   finalNumber = number
        // }
        // if (finalBoard === undefined) {
        //   finalBoard = JSON.parse(JSON.stringify(board)) // this works
        //   finalBoard = board // this causes finalBoard to always be the last value of `board`
        // }

        return { board, number: number }
      }
    }
  }

  return { board: finalBoard, number: finalNumber }
}

const computeScore = (board: Spot[][], number: string) => {
  let sumOfUnmarkedNums = 0;

  // Loop through all the values, and add any that aren't marked.
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {

      if (!board[i][j].marked) {
        sumOfUnmarkedNums += parseInt(board[i][j].number, 10)
      }
    }
  }

  return sumOfUnmarkedNums * parseInt(number, 10)
}


// The only thing that changed between day4-1.ts and this is in this function.
const getBestBingoBoard = (boards: string, numbers: string) => {

  let bingoBoards = getBingoBoards(boards)

  // This is horribly inefficient, but it was the fastest way to solve it.
  // Instead of reworking the functions, this simply uses the old functions
  // to find the worst board. It does this by finding the best board, then
  // filtering out the best board from the list of boards, then finding
  // the best board again, filtering it out, etc., until there is only one
  // more board left; the worst board.

  while (bingoBoards.length > 1) {
    const { board, number } = getBestBoard(bingoBoards, numbers)
    bingoBoards = bingoBoards.filter(a => JSON.stringify(a) !== JSON.stringify(board))

    if (bingoBoards.length === 1) {

      // At this point, we know we have the worst board, but we 
      // compute the best board once more just to get the number that
      // the board would win with.
      const { board, number } = getBestBoard(bingoBoards, numbers)
      if (board !== undefined && number !== undefined) {
        const finalAnswer = computeScore(board, number)
        console.log(finalAnswer)
      }
    }
  }
}

getBestBingoBoard(boards, numbers);
