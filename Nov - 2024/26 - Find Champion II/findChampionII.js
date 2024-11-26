/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var findChampion = function (n, edges) {
  const inDegree = Array(n).fill(0);

  for (const [ui, vi] of edges) {
    inDegree[vi]++;
  }

  let champion = -1;
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      if (champion !== -1) {
        return -1;
      }
      champion = i;
    }
  }

  return champion;
};
