/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

/**
 * Returns number of digits of largest integer.
 * @param {num[]} array 
 */
function getMaxLength(array) {
  let largest = 1;
  array.forEach(val => {
    if (val > largest) {
      largest = val;
    }
  });
  return `${largest}`.length;
}

/**
 * Gets digit of a number at a decimal place
 * @param {number} num 
 * @param {number} place 
 * @example getDigit(123, 0) returns 3
 * @example getDigit(123, 2) returns 1
 */
const getDigit = (num, place) => {
  const num_str = `${num}`;
  const n = num_str.length;
  const pos = n - 1 - place; // Note: "place" counts in reverse array order
  return parseInt(num_str[pos]);
};

/**
 * Executes radix sort
 * @param {array} array 
 */
function radixSort(array) {
  const d = getMaxLength(array);
  const n = array.length;
  const buckets = [...(new Array(10))].map((_, i) => ([]));
  for (let place = 0; place < d; place++) {
    for (let i = 0; i < n; i++) {
      const num = array[0];
      const num_digits = `${num}`.length;
      const digit = (num_digits <= place) ? 0 : getDigit(num, place);
      buckets[digit].push(num);
      array.shift();
    }
    for (let i = 0; i < buckets.length; i++) {
      array.push(...buckets[i]);
      buckets[i] = [];
    }
  }
  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
