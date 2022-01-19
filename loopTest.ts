const myArray = [[[1,2],[3,4],[5,6],[7,8]], [[1,2],[3,1],[6,6],[8,8]]];

let myValue: any = [];

// Assigning the variable of a `for ... of` does not overwrite the value on
// the later iterations.
for (const val of myArray) {

  for (const val2 of val) {

    if (val2[0] === 3) {
      myValue = val2
    }

    console.log(myValue);
  }
}

console.log(myValue);
