// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

/**
 * @param {number} id 
 * @param {array} array 
 */
function linearSearch(id, array) {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    if (array[i].id === id) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * @param {number} id 
 * @param {array} array 
 */
function binarySearch(id, array) {
  const n = array.length;
  if (n < 2) {
    return array[0]?.id === id
      ? array[0]
      : undefined;
  }
  const middle = Math.floor(n / 2);
  const { id: middle_id } = array[middle];
  if (middle_id === id) {
    return array[middle];
  } else {
    if (middle_id < id) {
      return binarySearch(id, array.slice(middle + 1, n));
    }
    return binarySearch(id, array.slice(0, middle));
  }
}

// unit tests
// do not modify the below code
test.skip("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" }
    ])
  ).toBe(lookingFor);
});

test.skip("binary search", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearch(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" }
    ])
  ).toBe(lookingFor);
});
