import data from './input/input7'

const testData = `16,1,2,0,4,2,7,1,2,14`

const computeLeastFuel = (positions: number[]) => {
  const max = Math.max(...positions)
  let bestScenario = { pos: 0, fuel: Infinity }

  for (let i = 0; i <= max; i++) {
    let fuelUsed = 0

    for (let pos of positions) {
      const distance = Math.abs(pos - i)
      fuelUsed += distance
    }

    if (fuelUsed < bestScenario.fuel) {
      bestScenario = { pos: i, fuel: fuelUsed }
    }
  }

  return bestScenario.fuel
}

const leastFuel = computeLeastFuel(data.split(',').map(a => parseInt(a, 10)))

console.log(leastFuel)