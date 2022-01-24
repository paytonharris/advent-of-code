import { data } from "./input/input6"

const testData = `3,4,3,1,2`

interface Fish {
  day: number;
  count: number;
}

const getLanternFish = (fishes: number[], days: number) => {
  // Initialize each count as 0
  let fishCount: Fish[] = []
  fishCount = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ day: i, count: 0 }))

  // Initialize the Fish[] with the values from input
  for (const fish of fishes) {
    fishCount[fish].count++
  }

  // Loop through each day and increment the count of fishes
  for (let day = 0; day < days; day++) {
    let tomorrowFish = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ day: i, count: 0 }))

    for (let fish of fishCount) {
      if (fish.day === 0) {
        tomorrowFish[8].count += fish.count
        tomorrowFish[6].count += fish.count
      } else {
        tomorrowFish[fish.day - 1].count += fish.count
      }
    }

    fishCount = tomorrowFish
  }

  return fishCount.reduce((prev, curr) => prev + curr.count, 0)
}

const fishCount = getLanternFish(data.split(',').map(a => parseInt(a, 10)), 256)

console.log(fishCount)