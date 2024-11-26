/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  const rows = 2,
    cols = 3;
  const target = "123450";
  let start = "";
  let zeroIndex;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      start += board[i][j].toString();
      if (board[i][j] === 0) zeroIndex = i * cols + j;
    }
  }

  const directions = [-1, 0, 1, 0, 0, -1, 0, 1];

  const neighbors = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4],
  ];

  let queue = [[start, zeroIndex, 0]];
  let seen = new Set([start]);

  while (queue.length > 0) {
    let [current, zero, depth] = queue.shift();
    if (current === target) {
      return depth;
    }

    for (let dir of neighbors[zero]) {
      let newBoard = current.split("");
      [newBoard[zero], newBoard[dir]] = [newBoard[dir], newBoard[zero]];
      let newState = newBoard.join("");
      if (!seen.has(newState)) {
        seen.add(newState);
        queue.push([newState, dir, depth + 1]);
      }
    }
  }

  return -1; // If no solution
};
