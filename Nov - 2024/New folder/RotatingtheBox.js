/**
 * @param {character[][]} box
 * @return {character[][]}
 */
var rotateTheBox = function (box) {
  function sort(row) {
    let i = 0;
    let j = row.length - 1;
    let spaces = 0;
    let lastSpace = -1;

    while (i <= j) {
      if (row[i] === "*") {
        i++;
      } else if (row[j] === "." && lastSpace === -1) {
        lastSpace = j;
        j--;
        spaces++;
      } else if (row[j] === ".") {
        j--;
        spaces++;
      } else if (row[j] === "#" && spaces > 0) {
        if (spaces > 1) {
          row[lastSpace] = "#";
          row[j] = ".";
          j--;
          lastSpace--;
        } else {
          row[lastSpace] = "#";
          row[j] = ".";
          lastSpace = -1;
          spaces = 0;
        }
      } else if (row[j] === "*" && spaces > 0) {
        lastSpace = -1;
        spaces = 0;
        j--;
      } else {
        j--;
      }
    }
    return row;
  }

  const m = box.length;
  const n = box[0].length;
  const rotated = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => ".")
  );

  let rowIndex = m - 1;
  for (let row of box) {
    const sortedRow = sort([...row]); // Copy the row for sorting to avoid mutating the original box
    for (let col = 0; col < n; col++) {
      rotated[col][rowIndex] = sortedRow[col];
    }
    rowIndex--;
  }

  return rotated;
};

console.log(rotateTheBox([["#", ".", "#"]]));
console.log(
  rotateTheBox([
    ["#", ".", "*", "."],
    ["#", "#", "*", "."],
  ])
);
console.log(
  rotateTheBox([
    ["#", "#", "*", ".", "*", "."],
    ["#", "#", "#", "*", ".", "."],
    ["#", "#", "#", ".", "#", "."],
  ])
);
