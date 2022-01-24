import { data } from "./input/input6"

const testData = `3,4,3,1,2`

const getLanternFish = (fishes: number[], days: number) => {
  for (let day = 0; day < days; day++) {
    fishes.forEach((fish, index) => {
      if (fish === 0) {
        fishes.push(8)
        fishes[index] = 6
      } else {
        fishes[index]--
      }
    })
  }

  return fishes.length
}

const fishCount = getLanternFish(data.split(',').map(a => parseInt(a, 10)), 80)

console.log(fishCount)