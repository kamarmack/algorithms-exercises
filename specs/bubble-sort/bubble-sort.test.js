/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
*/

/**
 * Bubble sort works by comparing two adjacent numbers next to each other 
 * and then swapping their places if the smaller index's value is larger 
 * than the larger index's. Continue looping through until all values are 
 * in ascending order
 * @param {array} nums 
 */
function bubbleSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    let leading_index = 0;
    for (let trailing_index = 1; trailing_index < n - i; trailing_index++) {
      const [a, b] = [nums[leading_index], nums[trailing_index]];
      if (a > b) {
        nums[trailing_index] = a;
        nums[leading_index] = b;
        swapped = true;
      }
      leading_index++;
    }
    if (!swapped) {
      break;
    }
  }
  return nums;
}

// unit tests
// do not modify the below code
test.skip("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = bubbleSort(nums);
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
