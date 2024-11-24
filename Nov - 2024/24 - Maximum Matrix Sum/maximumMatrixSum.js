/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxMatrixSum = function (matrix) {
  let n = matrix.length;
  let totalSum = 0;
  let minAbsValue = Infinity;
  let negativeCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let value = matrix[i][j];
      let absValue = Math.abs(value);
      totalSum += absValue;
      minAbsValue = Math.min(minAbsValue, absValue);
      if (value < 0) {
        negativeCount++;
      }
    }
  }

  if (negativeCount % 2 === 1) {
    totalSum -= 2 * minAbsValue;
  }

  return totalSum;
};

console.log(
  maxMatrixSum([
    [1, -1],
    [-1, 1],
  ])
); // Expected output: 4
console.log(
  maxMatrixSum([
    [1, 2, 3],
    [-1, -2, -3],
    [1, 2, 3],
  ])
); // Expected output: 16
