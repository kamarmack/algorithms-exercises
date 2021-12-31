/*

Binary Search Tree!

Name your class Tree. 

I'd suggest making another class called Node. You don't have to; you can make them all plain JS objects

Here you'll make a BST. Your Tree class will have keep track of a root which will be the first item added
to your tree. From there, if the item is less than the value of that node, it will go into its left subtree
and if greater it will go to the right subtree.

value - integer     - value being contained in the node
left  - Node/object - the left node which itself may be another tree
right - Node/object - the right node which itself may be another tree

*/

class Tree {
  constructor() {
    this.root = undefined;
  }
  add(value) {
    const n = new Node(value);
    if (this.root === undefined) {
      this.root = n;
    }
    else {
      let current_root = this.root;
      let found = false;
      while (!found) {
        if (value > current_root.value) {
          // go right
          if (current_root.right === undefined) {
            found = true;
            current_root.right = n;
          } else {
            current_root = current_root.right;
          }
        }
        else {
          // go left
          if (current_root.left === undefined) {
            found = true;
            current_root.left = n;
          } else {
            current_root = current_root.left;
          }
        }
      }
    }
  }
  toJSON() {
    return JSON.stringify(this.root.serialize(), undefined, 4);
  }
  toObject() {
    return this.root.serialize();
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
  }
  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === undefined ? undefined : this.left.serialize();
    ans.right = this.right === undefined ? undefined : this.right.serialize();
    return ans;
  }
}

// unit tests
// do not modify the below code
describe.skip("Binary Search Tree", function () {
  it("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();
    // render(objs, nums);

    expect(objs.value).toEqual(3);

    expect(objs.left.value).toEqual(1);
    expect(objs.left.left).toBeUndefined();

    expect(objs.left.right.value).toEqual(2);
    expect(objs.left.right.left).toBeUndefined();
    expect(objs.left.right.right).toBeUndefined();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(4);
    expect(objs.right.left.left).toBeUndefined();

    expect(objs.right.left.right.value).toEqual(6);
    expect(objs.right.left.right.left.value).toEqual(5);
    expect(objs.right.left.right.left.right).toBeUndefined();
    expect(objs.right.left.right.left.left).toBeUndefined();

    expect(objs.right.right.value).toEqual(10);
    expect(objs.right.right.right).toBeUndefined();

    expect(objs.right.right.left.value).toEqual(9);
    expect(objs.right.right.left.right).toBeUndefined();

    expect(objs.right.right.left.left.value).toEqual(8);
    expect(objs.right.right.left.left.right).toBeUndefined();
    expect(objs.right.right.left.left.left).toBeUndefined();
  });
});
