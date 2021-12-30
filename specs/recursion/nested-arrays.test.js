/* 

  write a function that accepts an array that only contains
  two types of things: numbers and arrays. those nested arrays
  also only contain numbers and other, nested arrays.

  example: nestedAdd([1, 2, [3]]) = 6
           nestedAdd([[[2]], 1, [1, 3]]) = 7
 
 */

/**
 * Adds weird numbers
 * @param {array} array 
 */
function nestedAdd(array) {
  const n = array.length;
  let running_total = 0;
  let i = -1;
  const contains_nested_arr = array.some(val => {
    i++;
    if (typeof val === 'object') {
      return true;
    }
    running_total += val;
    return false;
  });
  if (!contains_nested_arr) {
    return running_total;
  }
  return (
    running_total
    + nestedAdd(array[i])
    + nestedAdd(array.slice(i + 1, n))
  );
}

test.skip("nested arrays addition", () => {
  expect(nestedAdd([1, 2, 3])).toEqual(6);
  expect(nestedAdd([1, [2], 3])).toEqual(6);
  expect(nestedAdd([[[[[[[[[5]]]]]]]]])).toEqual(5);
  expect(nestedAdd([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
});
