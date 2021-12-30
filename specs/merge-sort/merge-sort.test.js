'use strict';
/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

/**
 * Merges two sorted arrays
 * @param {array} left 
 * @param {array} right 
 */
function merge(left, right) {
  const sorted_arr = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      sorted_arr.push(left.shift());
    } else {
      sorted_arr.push(right.shift());
    }
  }
  sorted_arr.push(...left, ...right);
  return sorted_arr;
}

/**
 * merge sort
 * @param {array} nums 
 */
const mergeSort = (nums) => {
  if (nums.length < 2) {
    return nums;
  }
  const n = nums.length;
  const split_index = Math.floor(n / 2);
  const left_half = nums.slice(0, split_index);
  const right_half = nums.slice(split_index, n);
  return merge(mergeSort(left_half), mergeSort(right_half));
};

// unit tests
// do not modify the below code
test.skip("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
