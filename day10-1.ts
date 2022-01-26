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
  let score = 0

  for (let row of rows) {
    let stack: string[] = []

    for (let symbol of row) {
      if (openers.indexOf(symbol) !== -1) { // if it's an opener
        stack.push(symbol)
      } else { // it's a closer
        
        const previousSymbol = stack[stack.length - 1]
        // if the opener matches the closer, it's all good
        if (openers.indexOf(previousSymbol) === closers.indexOf(symbol)) {
          stack.pop()
        } else { // if they don't match, we found a syntax error
          switch (symbol) {
            case ')': 
              score += 3
              break
            case ']': 
              score += 57
              break
            case '}':
              score += 1197
              break
            case '>':
              score += 25137
              break
          }

          break
        }
      }
    }
  }

  console.log(score)
}

findErrorScore(data.split('\n'))