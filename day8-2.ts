import data from './input/input8'

const testData = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`

const testMapping = [
  'cagedb',
  'ab',
  'gcdfa',
  'fbcad',
  'eafb',
  'cdfbe',
  'cdfgeb',
  'dab',
  'acedgfb',
  'cefabd'
]

// How to decode the values:
// length 5: 
  // 2: gcdfa // 5 chars long exactly 2 chars from 4 and that's unique
  // 3: fbcad // 5 letters long and contains all chars from 7 and that's unique
  // 5: cdfbe // 5 chars long, has 3 chars from 4 // do this one last

// length 6:
  // 0: cagedb // is 6 letters has all chars from 7 but not all chars from 4
  // 6: cdfgeb // is 6 letters, has 2 chars from 7
  // 9: cefabd // is 6 letters long and contains all chars from 4

// unique lengths:
  // 7: dab // known
  // 1: ab // known
  // 4: eafb // known
  // 8: acedgfb // known

const findMapping = (input: string[]) => {
  let mapping = ['', '', '', '', '', '', '', '', '', '']

  // one is the only one with length 2
  mapping[1] = input.filter(a => a.length === 2)[0]
  // 4 has length 4
  mapping[4] = input.filter(a => a.length === 4)[0]
  // 7 has length 3
  mapping[7] = input.filter(a => a.length === 3)[0]
  // 8 has length 7
  mapping[8] = input.filter(a => a.length === 7)[0]

  let length5Strings = input.filter(a => a.length === 5)
  let length6Strings = input.filter(a => a.length === 6)

  // 9 is 6 letters long and contains all chars from 4
  for (let word of length6Strings) {
    let allLettersMatch = true

    for (let letter of mapping[4].split("")) {

      if (word.indexOf(letter) === -1) {
        allLettersMatch = false
      }
    }

    if (allLettersMatch) {
      mapping[9] = word
      length6Strings = length6Strings.filter(a => a !== word)
    }
  }

  // 6 is 6 letters, has 2 chars from 7
  for (let word of length6Strings) {
    let countOfMatches = 0

    for (let letter of mapping[7].split("")) {

      if (word.indexOf(letter) !== -1) {
        countOfMatches++
      }
    }

    if (countOfMatches === 2) {
      mapping[6] = word
      length6Strings = length6Strings.filter(a => a !== word)
    }
  }
  
  // 0 is the last 6-length string that hasn't been used yet.
  mapping[0] = length6Strings[0]

  // 2 is 5 chars long and has exactly 2 chars from 4
  for (let word of length5Strings) {
    let countOfMatches = 0

    for (let letter of mapping[4].split("")) {

      if (word.indexOf(letter) !== -1) {
        countOfMatches++
      }
    }

    if (countOfMatches === 2) {
      mapping[2] = word
      length5Strings = length5Strings.filter(a => a !== word)
    }
  }

  // 3 is 5 letters long and contains all chars from 7 and that's unique
  for (let word of length5Strings) {
    let allLettersMatch = true

    for (let letter of mapping[7].split("")) {

      if (word.indexOf(letter) === -1) {
        allLettersMatch = false
      }
    }

    if (allLettersMatch) {
      mapping[3] = word
      length5Strings = length5Strings.filter(a => a !== word)
    }
  }

  // 5 is the only remaining code of length 5
  mapping[5] = length5Strings[0]

  return mapping;
}

const lines = data.split('\n')

let values = 0;

for (let line of lines) {
  let lineMeaning = ''
  const input = line.split(' | ')[0]
  const output = line.split(' | ')[1]

  for (let word of output.split(' ')) {
    // Loop through each output word
    // Get its value by matching its letters with the mapping
    let wordValue = 0;

    const mapping = findMapping(input.split(' '))

    mapping.forEach((code, index) => {
      if (code.length === word.length) {
        let wordMatches = true

        word.split('').forEach(letter => {
          if (code.indexOf(letter) === -1) {
            wordMatches = false
          }
        })

        if (wordMatches) {
          wordValue = index
        }
      }
    })

    lineMeaning = `${lineMeaning}${wordValue}`
  }

  console.log(lineMeaning)
  values += parseInt(lineMeaning, 10)
}

console.log(values)
