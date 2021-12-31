/*
  ArrayList
  
  We are going to approximate an implementation of ArrayList. In JavaScript terms, that means we are
  going to implement an array using objects. You should not use arrays at all in this exercise, just
  objects. Make a class (or constructor function; something you can call new on) called ArrayList.
  ArrayList should have the following properties (in addition to whatever properties you create):
  
  length - integer  - How many elements in the array
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class ArrayList {
  length = 0;
  list = {};
  constructor(length) {
    this.length = length || 0;
    if (length) {
      for (let i = 0; i < length; i++) {
        this.list[i] = undefined;
      }
    }
  }
  push(value) {
    this.list[this.length] = value;
    this.length++;
  }
  pop() {
    if (this.length === 0) {
      return undefined;
    }
    const end = this.length - 1;
    let pop_obj_copy = {};
    Object.assign(pop_obj_copy, { pop_val: this.list[end] });
    const { pop_val } = pop_obj_copy;
    delete this.list[end];
    this.length--;
    return pop_val;
  }
  get(i) {
    if (i < 0 || (i >= this.length)) {
      return undefined;
    }
    return this.list[i];
  }
  delete(i) {
    if (i < 0 || i >= this.length) {
      return undefined;
    }
    let delete_object_copy = {};
    Object.assign(delete_object_copy, { delete_val: this.list[i] });
    const { delete_val } = delete_object_copy;
    delete this.list[i];
    while (i < this.length) {
      let shift_object_copy = {};
      Object.assign(shift_object_copy, { shift_val: this.list[i + 1] });
      const { shift_val } = shift_object_copy;
      this.list[i] = shift_val;
      delete this.list[i + 1];
      i++;
    }
    this.length--;
    return delete_val;
  }
}

// unit tests
// do not modify the below code
describe.skip("ArrayList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new ArrayList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(ArrayList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
