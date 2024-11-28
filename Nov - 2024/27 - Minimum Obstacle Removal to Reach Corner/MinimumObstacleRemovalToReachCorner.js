class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this.bubbleUp();
  }

  pop() {
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.trickleDown();
    }
    return top;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const item = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (item[0] >= parent[0]) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = item;
      index = parentIndex;
    }
  }

  trickleDown() {
    let index = 0;
    const length = this.heap.length;
    const item = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = null;
      if (leftChildIndex < length) {
        let leftChild = this.heap[leftChildIndex];
        if (leftChild[0] < item[0]) {
          swapIndex = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        let rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null ? item : this.heap[swapIndex])[0] > rightChild[0]
        ) {
          swapIndex = rightChildIndex;
        }
      }
      if (swapIndex === null) break;
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = item;
      index = swapIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function minimumObstacles(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const obstacleCount = Array.from({ length: m }, () =>
    Array(n).fill(Infinity)
  );
  obstacleCount[0][0] = 0;

  const minHeap = new MinHeap();
  minHeap.push([0, 0, 0]);

  while (!minHeap.isEmpty()) {
    const [currObstacles, x, y] = minHeap.pop();

    if (x === m - 1 && y === n - 1) {
      return currObstacles;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        const newObstacleCount = currObstacles + grid[nx][ny];
        if (newObstacleCount < obstacleCount[nx][ny]) {
          obstacleCount[nx][ny] = newObstacleCount;
          minHeap.push([newObstacleCount, nx, ny]);
        }
      }
    }
  }

  return -1;
}

// Example tests
const grid1 = [
  [0, 1, 1],
  [1, 1, 0],
  [1, 1, 0],
];
const grid2 = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
];
console.log(minimumObstacles(grid1));
console.log(minimumObstacles(grid2));
