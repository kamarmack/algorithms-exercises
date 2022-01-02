/*

Maze:

Start with a 2D Array (m x n Matrix) where values can be:
0 – open space
1 - closed space, cannot pass through. a wall
2 - one of the two origination points

For instance:
A = [
 [0, 0, 2, 0],
 [1, 1, 0, 0],
 [1, 0, 2, 1],
 [1, 0, O, 0],
 [0, 0, 0, 0],
]

This is a 5 x 4 Matrix

m = 5 (number of rows)
n = 4 (number of columns)

Reading A[0][2] returns "2"


When you read the entire 2D array using nested for loops,
you touch each element exactly once and in this order.

Keys = [
 [0, 1, 2, 3],
 [4, 5, 6, 7],
 [8, 9, 10, 11],
 [12, 13, 14, 15],
 [16, 17, 18, 19],
]

Assuming valid i,j bounds, the following formula computes each element's Key in O(1)
K(n,i,j) = (n * i) + j

Example
---
K(4,3,2)
= (4 * 3) + 2
= 12 + 2
= 14


The above Keys are used to model A as a graph G such that:

For each K in Keys:
  G[A][K] returns N[].

Each value k in N[] is the key of some node K' reachable in one hop.
(Assume only horizontal and vertical hops of one space are allowed.)

G[A] = {

  0: [1],
  1: [0,2],
  2: [1,3,6],
  3: [2,7],
  
  4: [],
  5: [],
  6: [2,7,10],
  7: [3,6],
  
  8: [],
  9: [10,13],
  10: [6,9,14],
  11: [],
  
  12: [],
  13: [9,14,17],
  14: [10,13,15,18],
  15: [14,19],
  
  16: [17],
  17: [13,16,18],
  18: [14,17,19],
  19: [15,18],

}


Interesting corollary:

In the above example, we have the following set of wall nodes
W = {4,5,8,11,12}

Wall nodes can not reach other nodes.
Wall nodes can not be reached from other nodes.

This leads to two useful properties:
  For each element K in Keys: no element k in G[A][K] can be a member of W
  For each element w in W: G[A][w] has no elements

Thus, if we denote an empty m x n array (no walls) as AEmxn,
we can use the following algorithm to compute G[A][K]:

G[A][K] =
  if K in set W
    return []
  else
    return G[AEmxn][K].filter( k => k not in set W )


Compare the above graph G[A] to the graph of G[AE5x4] to see algo in action

G[AE5x4] = {

  0: [1,4],
  1: [0,2,5],
  2: [1,3,6],
  3: [2,7],
  
  4: [0,5,8],
  5: [1,4,6,9],
  6: [2,5,7,10],
  7: [3,6,11],
  
  8: [4,9,12],
  9: [5,8,10,13],
  10: [6,9,11,14],
  11: [7,10,15],
  
  12: [8,13,16],
  13: [9,12,14,17],
  14: [10,13,15,18],
  15: [11,14,19],
  
  16: [12,17],
  17: [13,16,18],
  18: [14,17,19],
  19: [15,18],

}

*/


class Maze {
  adj_list = [];
  m;
  n;
  constructor(matrix) {
    this.m = matrix.length;
    this.n = matrix[0].length;
    for (let iA = 0; iA < this.m; iA++) {
      for (let jA = 0; jA < this.n; jA++) {
        const cellA = new Cell(iA, jA, this.m, this.n);
        const index = cellA.getAdjListKey();
        this.adj_list[index] = [];
        if (matrix[iA][jA] !== 1) {
          const queue = cellA.possibleConnectionCells();
          for (let k = 0; k < queue.length; k++) {
            const iB = queue[k][0];
            const jB = queue[k][1];
            if (matrix[iB][jB] !== 1) {
              const cellB = new Cell(iB, jB, this.m, this.n);
              const adj_node = cellB.getAdjListKey();
              this.adj_list[index].push(adj_node);
            }
          }
        }
      }
    }
  }
  findShortestPathLength([iA, jA], [iB, jB]) {

    const start_node = new Cell(iA, jA, this.m, this.n);
    const end_node = new Cell(iB, jB, this.m, this.n);
    const start_key = start_node.getAdjListKey();
    const end_key = end_node.getAdjListKey();

    if (start_key === end_key) {
      // Same node
      return 0;
    }
    
    const al = [].concat(this.adj_list);
    const start_adj = al[start_key];
    const end_adj = al[end_key];
    if (start_adj.length === 0 || end_adj.length === 0) {
      // (1) One or both nodes is a wall, or
      // (2) One or both nodes is surrounded by walls
      return -1;
    }

    let start_hops = 0;
    let end_hops = 0;
    const start_seen = { [start_key]: { distance: start_hops } };
    const end_seen = { [end_key]: { distance: end_hops } };
    
    let process = 0;
    const start_queue = [].concat(start_adj);
    const end_queue = [].concat(end_adj);

    while (start_queue.length > 0 && end_queue.length > 0) {
      if (process === 0) {
        // Spiral from start
        const temp = [];
        start_hops++;
        while (start_queue.length > 0) {
          const child_key = start_queue.shift();
          if (!start_seen[child_key]) {
            // Unprocessed from start
            if (end_seen[child_key]) {
              // Done
              return (
                end_seen[child_key].distance
                + start_hops
              );
            }
            start_seen[child_key] = {
              distance: start_hops,
            };
            const unseen_child_adj = al[child_key]
              .filter(c => !start_seen[c]);
            temp.push(...unseen_child_adj);
          }
        }
        start_queue.push(...temp);
        process = 1;
      } else {
        // Spiral from end
        const temp = [];
        end_hops++;
        while (end_queue.length > 0) {
          const child_key = end_queue.shift();
          if (!end_seen[child_key]) {
            // Unprocessed from end
            if (start_seen[child_key]) {
              // Done
              return (
                start_seen[child_key].distance
                + end_hops
              );
            }
            end_seen[child_key] = {
              distance: end_hops
            };
            const unseen_child_adj = al[child_key]
              .filter(c => !end_seen[c]);
            temp.push(...unseen_child_adj);
          }
        }
        end_queue.push(...temp);
        process = 0;
      }
    }

    // No path exists
    return -1;
  }
}

class Cell {

  constructor(i, j, m, n) {
    this.i = i;
    this.j = j;
    this.m = m;
    this.n = n;
  }

  /**
   * Warning:
   * 
   * Matrix notation can make it very easy to make mistakes
   * when programming "Left/Right/Top/Bottom" logic.
   * 
   * In cartesian notation, the x term (the 1st term)
   * determines "Left/Right" relationships between coordinates.
   * 
   * However, in matrix notation the j term (the 2nd term)
   * determines "Left/Right" relationships between elements.
   * 
   * Secondly, going "up" in cartesian notation requires addition (of the y term)
   * whereas going "up" in matrix notation requires subtraction (of the i term)
   * 
   */
  possibleConnectionCells() {
    const list = [];
    const min_j = 0;
    const max_j = this.n - 1;
    const min_i = 0;
    const max_i = this.m - 1;
    if (this.j > min_j) {
      list.push([this.i, this.j - 1]); // Possible node "left" of cell
    }
    if (this.j < max_j) {
      list.push([this.i, this.j + 1]); // Possible node "right" of cell
    }
    if (this.i > min_i) {
      list.push([this.i - 1, this.j]); // Possible node "above" cell
    }
    if (this.i < max_i) {
      list.push([this.i + 1, this.j]); // Possible node "below" cell
    }
    return list;
  }

  getAdjListKey() {
    return (this.n * this.i) + this.j;
  }

}

function findShortestPathLength(maze, [iA, jA], [iB, jB]) {
  const m = new Maze(maze);
  return m.findShortestPathLength([iA, jA], [iB, jB]);
}

// unit tests
describe.skip("pathfinding – cell class", function () {
  const c1 = new Cell(0, 0, 5, 4);
  const c2 = new Cell(2, 2, 5, 4);
  const c3 = new Cell(1, 3, 5, 4);
  const c4 = new Cell(3, 0, 5, 4);
  it("should create valid (0,0) cell in 5x4 maze", () => {
    expect(c1.possibleConnectionCells())
      .toEqual([
        [ 0, 1 ],
        [ 1, 0 ],
      ]);
  });
  it("should create valid (2,2) cell in 5x4 maze", () => {
    expect(c2.possibleConnectionCells())
      .toEqual([
        [ 2, 1 ],
        [ 2, 3 ],
        [ 1, 2 ],
        [ 3, 2 ],
      ]);
  });
  it("should create valid (1,3) cell in 5x4 maze", () => {
    expect(c3.possibleConnectionCells())
      .toEqual([
        [ 1, 2 ],
        [ 0, 3 ],
        [ 2, 3 ],
      ]);
  });
  it("should create valid (3,0) cell in 5x4 maze", () => {
    expect(c4.possibleConnectionCells())
      .toEqual([
        [ 3, 1 ],
        [ 2, 0 ],
        [ 4, 0 ],
      ]);
  });
});

describe.skip("pathfinding – happy path", function () {
  
  const testMatrix = [
    [0, 0, 2, 0],
    [1, 1, 0, 0],
    [1, 0, 2, 1],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const test_maze = new Maze(testMatrix);
  it("should translate testMatrix to a maze (i.e. create correct adj list)", () => {
    const test_maze_adj = test_maze.adj_list
      .map(a => a.sort((a, b) => a - b));
    expect(test_maze_adj).toEqual([
      [1],
      [0,2],
      [1,3,6],
      [2,7],
      [],
      [],
      [2,7,10],
      [3,6],
      [],
      [10,13],
      [6,9,14],
      [],
      [],
      [9,14,17],
      [10,13,15,18],
      [14,19],
      [17],
      [13,16,18],
      [14,17,19],
      [15,18],
    ]);
  });
  
  
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });
  
  
  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [5, 2])).toEqual(7);
  });

  
  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2]
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [7, 1], [7, 7])).toEqual(16);
  });
  
  
  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
  /**/

});

describe.skip("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [1, 2])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2]
  ];
  it("should return -1 when there's Possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
