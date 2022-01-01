/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

/**
 * @param {array} array 
 */
const heapSort = (array) => {
  createMaxHeap(array);
  let n = array.length - 1;
  while (n > 0) {
    swap(array, 0, n);
    heapify(array, 0, n);
    n--;
  }
  return array;
};

/**
 * Accept array.
 * Iteratively modify array values until array conforms to max heap rules
 * 
 * Given
 * [5, 3, 2, 10, 1, 9, 8, 6, 4, 7]
 * 
 * Return
 * [10, 7, 9, 6, 5, 2, 8, 3, 4, 1]
 * 
 * @param {array} array 
 */
const createMaxHeap = (array) => {
  const n = array.length;
  const middle = Math.floor(n / 2);
  for (let i = middle - 1; i > -1; i--) {
    heapify(array, i, n);
  }
  return void 0;
};

/**
 * @param {array} array 
 * @param {number} index [0, array.length)
 * @param {number} heapSize 
 */
const heapify = (array, index, heapSize) => {
  while (true) {
    const value = array[index];
    const left_child_index = 2 * index + 1;
    const right_child_index = 2 * index + 2;
    const left_child_value = left_child_index < heapSize
      ? array[left_child_index]
      : undefined;
    const right_child_value = right_child_index < heapSize
      ? array[right_child_index]
      : undefined;
    if (value < left_child_value) {
      if (left_child_value < right_child_value) {
        swap(array, index, right_child_index);
        index = right_child_index;
        continue;
      }
      swap(array, index, left_child_index);
      index = left_child_index;
      continue;
    }
    if (value < right_child_value) {
      swap(array, index, right_child_index);
      index = right_child_index;
      continue;
    }
    break;
  }
  return void 0;
};

const swap = (array, index, child_index) => {
  const temp = array[index];
  array[index] = array[child_index];
  array[child_index] = temp;
  return void 0;
};

// unit tests
// do not modify the below code
test.skip("heap sort", function () {
  
  // – swap() test
  const swap_nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  swap(swap_nums, 0, swap_nums.length - 2);
  expect(swap_nums).toEqual([9, 5, 3, 8, 10, 6, 4, 7, 2, 1]);

  // – heapify() test
  
  // Logic:
  // start at index 4, value 1
  // left child is index 9 value 7, right child is index 10, out of bounds
  // 7 is larger than 1, swap left child and parent
  // [5, 3, 2, 10, 7, 9, 8, 6, 4, 1]
  // call heapify on index 9, does nothing
  const heapify_nums_t1 = [5, 3, 2, 10, 1, 9, 8, 6, 4, 7];
  heapify(heapify_nums_t1, 4, heapify_nums_t1.length);
  expect(heapify_nums_t1).toEqual([5, 3, 2, 10, 7, 9, 8, 6, 4, 1]);
  
  // Logic:
  // i-- index 3, value 10
  // left child is index 7 value 6, right child is index 8 value 4
  // neither is larger than 10
  // nothing to do, next iteration
  const heapify_nums_t2 = [5, 3, 2, 10, 7, 9, 8, 6, 4, 1];
  heapify(heapify_nums_t2, 3, heapify_nums_t2.length);
  expect(heapify_nums_t2).toEqual([5, 3, 2, 10, 7, 9, 8, 6, 4, 1]);

  // – createMaxHeap() test
  const create_max_heap_nums = [5, 3, 2, 10, 1, 9, 8, 6, 4, 7];
  createMaxHeap(create_max_heap_nums);
  expect(create_max_heap_nums).toEqual([10, 7, 9, 6, 5, 2, 8, 3, 4, 1]);

  // – heapSort() test
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  
});
