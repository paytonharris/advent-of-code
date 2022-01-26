import data from './input/input10'

const testData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`

const openers = ['(', '[', '{', '<']
const closers = [')', ']', '}', '>']

const findErrorScore = (rows: string[]) => {
  let scores: number[] = []

  for (let row of rows) {
    let stack: string[] = []
    const symbols = row.split('')

    let lineHasSyntaxErrors = false

    symbols.forEach((symbol, index) => {
      if (index === 0) {
        lineHasSyntaxErrors = false
      }

      if (openers.indexOf(symbol) !== -1) { // if it's an opener
        stack.push(symbol)
      } else { // it's a closer
        const previousSymbol = stack[stack.length - 1]
        // if the opener matches the closer, pop it to show that it has a match
        if (openers.indexOf(previousSymbol) === closers.indexOf(symbol)) {
          stack.pop()
        }
        else {
          lineHasSyntaxErrors = true
        }
      }

      // If we get to the end of the line and it hasn't had syntax errors yet, 
      // and there are symbols still on the stack, then there are dangling symbols. 
      // These danglers let us calculate the autocomplete score.
      if (!lineHasSyntaxErrors && index === symbols.length - 1 && stack.length > 0) {
        let score = stack.reduceRight((prev, curr) => {
          prev *= 5

          switch (curr) {
            case '(': 
              return prev + 1
            case '[': 
              return prev + 2
            case '{':
              return prev + 3
            case '<':
              return prev + 4
            default:
              return 0
          }
        }, 0)

        scores.push(score)
      }
    })
  }

  // Sort the scores and find the middle one
  scores = scores.sort((a, b) => b - a)
  console.log(scores[Math.floor(scores.length / 2)])
}

findErrorScore(data.split('\n'))