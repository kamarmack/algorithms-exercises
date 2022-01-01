/**
 * Tail Recursion (better performance)
 * @param {array} queue 
 * @param {array} array 
 */
const breadthFirstTraverse = (queue, array) => {
  if (queue.length === 0) {
    return array;
  }
  const n = queue.shift();
  array.push(n.value);
  if (n.left) {
    queue.push(n.left);
  }
  if (n.right) {
    queue.push(n.right);
  }
  return breadthFirstTraverse(queue, array);
};

/**
 * Basic Recursion (better for my mental model)
 * @param {array} queue 
 * @param {array} array 
 */
const breadthFirstTraverseR2 = (queue, array) => {
  if (queue.length === 0) {
    return array;
  }
  const n = queue.shift();
  array.push(n.value);
  if (n.left) {
    queue.push(n.left);
  }
  if (n.right) {
    queue.push(n.right);
  }
  breadthFirstTraverse(queue, array);
  return array;
};

/**
 * Iterative
 * @param {array} queue 
 * @param {array} array 
 */
const breadthFirstTraverse2 = (queue, array) => {
  while (queue.length > 0) {
    const n = queue.shift();
    array.push(n.value);
    if (n.left) {
      queue.push(n.left);
    }
    if (n.right) {
      queue.push(n.right);
    }
  }
  return array;
};

// unit tests
// do not modify the below code
describe.skip("breadth-first tree traversal", function () {
  const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  const tree = {
    value: "A",
    left: {
      value: "B",
      left: {
        value: "D",
        left: {
          value: "G",
          left: null,
          right: null
        },
        right: null
      },
      right: {
        value: "E",
        left: null,
        right: {
          value: "H",
          left: {
            value: "K",
            left: null,
            right: null
          }
        }
      }
    },
    right: {
      value: "C",
      left: {
        value: "F",
        left: {
          value: "I",
          left: null,
          right: null
        },
        right: {
          value: "J",
          left: null,
          right: null
        }
      },
      right: null
    }
  };

  test("breadthFirstTraverse", () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
    expect(breadthFirstTraverseR2([tree], [])).toEqual(answer);
    expect(breadthFirstTraverse2([tree], [])).toEqual(answer);
  });
});
