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

const computePowerConsumption = (data: string) => {
  const numbers = data.split("\n").filter(a => a !== "")

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

  let finalGamma = '';
  let finalEpsilon = '';

  counts.forEach(count => {
    if (count.ones > count.zeros) {
      finalGamma += '1'
      finalEpsilon += '0'
    } else if (count.zeros > count.ones) {
      finalGamma += '0'
      finalEpsilon += '1'
    } else {
      console.log("ambiguous value")
    }
  })

  console.log(`epsilon: ${finalEpsilon}`)
  console.log(`gamma: ${finalGamma}`)

  const epsilon = parseInt(finalEpsilon, 2)
  const gamma = parseInt(finalGamma, 2)

  console.log(epsilon * gamma)
}

computePowerConsumption(input)