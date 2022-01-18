import { input } from "./input/input3-1";

const testInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`

interface Count {
  ones: number,
  zeros: number
}

const getCounts = (numbers: string[]) => {

  let counts: Count[] = []

  numbers.forEach(number => {
    const chars = number.split("")

    chars.forEach((char, index) => {
      // initialize the array element
      if (counts[index] === undefined) {
        counts[index] = { ones: 0, zeros: 0 }
      }

      // count the 0s and 1s
      if (char === '0') {
        counts[index].zeros++
      } else if (char === '1') {
        counts[index].ones++
      }
    })
  })

  return counts;
}

const computeLifeSupport = (data: string) => {
  const numbers = data.split("\n").filter(a => a !== "")

  let oxygenCandidates = numbers;
  let co2Candidates = numbers;

  for (let index = 0; index < numbers[0].length; index++) {

    const oxygenCounts = getCounts(oxygenCandidates)
    if (oxygenCounts[index].zeros > oxygenCounts[index].ones) {
      if (oxygenCandidates.length > 1) {
        oxygenCandidates = oxygenCandidates.filter(a => a[index] === '0')
      }
    } else {
      if (oxygenCandidates.length > 1) {
        oxygenCandidates = oxygenCandidates.filter(a => a[index] === '1')
      }
    }

    const co2Counts = getCounts(co2Candidates)
    if (co2Counts[index].zeros > co2Counts[index].ones) {
      if (co2Candidates.length > 1) {
        co2Candidates = co2Candidates.filter(a => a[index] === '1')
      }
    } else {
      if (co2Candidates.length > 1) {
        co2Candidates = co2Candidates.filter(a => a[index] === '0')
      }
    }
  }

  const co2 = parseInt(co2Candidates[0], 2)
  const oxygen = parseInt(oxygenCandidates[0], 2)
  
  console.log(co2)
  console.log(oxygen)

  console.log(`final answer: ${co2 * oxygen}`)
}

computeLifeSupport(input)