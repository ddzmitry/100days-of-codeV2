/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
    console.log(arr)
  // const innerLength = arr.length()
  // 1 3 5 7 8 ( first , last)
  // 1 3 5 7 8 ( second , last -1 -1)
  // 1 3 5 7 8
  // 1 3 5 7 8
  // 1 3 5 7 8
  let StartToEnd = 0;
  let EndToStart = 0;
  for (let i = 0; i < arr.length; i++) {
    // array inner index 0
    // if array of index 0 then we need arr[i] index 0

    for (let k = 0; k < arr[i].length; k++) {
      if (k === i) {
        // corner
        console.log(arr[i][k]);
        StartToEnd += arr[i][k];
        // middle
        console.log(arr[i][arr.length - i - 1]);
        EndToStart += arr[i][arr.length - i - 1];
      }
    }
  }

  return Math.abs(StartToEnd - EndToStart);
}

let testVal = [[11, 2, 4],[4, 5, 6],[10, 8, -12]];
console.log(diagonalDifference(testVal))