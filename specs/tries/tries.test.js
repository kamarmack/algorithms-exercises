// in order to pass the unit tests, you will need to create a function called createTrie that accepts a list of strings
// as a parameter and returns an object with a method on it called "`complete`. complete is a method that when called
// with a string will return an array of up to length three that are autocompleted suggestions of how to finish that string.
// for the sake of this exercise, it does not matter which order these strings are returned in or if there are more than three
// possible suggestions, which three you choose
//
// feel free to see the dataset in cities.js
//
// I suggest working on one unit test at a time, use `test.skip` instead of `test` to not run unit tests
// the edge cases are for fun and for this exercise you don't necessarily need to pass them

const { CITY_NAMES } = require("./cities.js");
const _ = require("lodash"); // needed for unit tests

class Node {
  
  constructor(letter) {
    this.letter = letter;
    this.children = {};
  }

  /**
   * @param {string[][]} paths 
   */
  addPaths(paths) {
    for (let i = 0; i < paths.length; i++) {
      this._addPath(paths[i]);
    }
  }

  /**
   * @param {string[]} path 
   */
  _addPath(path) {
    let p = this.children;
    for (let i = 0; i < path.length; i++) {
      const l = path[i].toLowerCase();
      const end = i === path.length - 1;
      if (!p[l]) {
        p[l] = {};
      }
      if (end) {
        p[l]._valid_string = true;
      }
      p = p[l];
    }
  }

  /**
   * @param {string} string 
   */
  complete(string) {
    
    // Get reference to path
    const path = this._getPath(string.toLowerCase().split(''));
    
    // No path
    if (path === -1) {
      return [];
    }
    
    // Grab all children
    const total_children = Object.keys(path);
    
    // Initialize matches
    const valid_string = total_children.includes('_valid_string');
    const matches = valid_string ? [string] : [];
    const char_children = total_children
      .filter(c => c !== '_valid_string');
    
    // Base case: No children

    // Done
    if (char_children.length === 0) {
      return matches;
    }

    // Recursive case: At least one character child

    // Immediately merge the string param plus my childless children
    const leaf_children = char_children
      .filter(c => {
        const child_path = path[c];
        const child_path_total_children = Object.keys(child_path)
          .filter(_c => _c !== '_valid_string');
        return child_path_total_children.length === 0
      });
    matches.push(
      ...leaf_children
      .map(c => `${string}${c}`)
    );

    // Recurse on my children that have children
    const child_bearing_children = char_children
      .filter(c => {
        const child_path = path[c];
        const child_path_total_children = Object.keys(child_path)
          .filter(_c => _c !== '_valid_string');
        return child_path_total_children.length > 0
      })
      .map(c => this.complete(`${string}${c}`));

    // Done
    return matches.concat(...child_bearing_children);
  }

  /**
   * @param {string[]} path 
   */
  _getPath(path) {
    let p = this.children;
    for (let i = 0; i < path.length; i++) {
      const l = path[i];
      if (!p[l]) {
        return -1;
      }
      p = p[l];
    }
    return p;
  }

}

/**
 * @param {string[]} words 
 */
const createTrie = (words) => {
  const root = new Node('');
  root.addPaths(words.map(w => w.toLowerCase().split('')));
  return root;
};

// unit tests
// do not modify the below code
describe.skip("tries", function () {
  
  test.skip("testing addPath", () => {
    const example_paths = [
      ['c','o','t'],
      ['c','a'],
    ];
    const root1 = new Node('');
    root1._addPath(example_paths[0]);
    root1._addPath(example_paths[1]);
    console.log(JSON.stringify({ r1c: root1.children }, null, '\t'));
    const root2 = new Node('');
    root2.addPaths(example_paths);
    console.log(JSON.stringify({ r2c: root2.children }, null, '\t'));
  });
  
  test("dataset of 10 – san", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["san antonio", "san diego", "san jose"])
        .length
    ).toBe(3);
  });

  test("dataset of 10 – philadelph", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("philadelph");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["philadelphia"]).length).toBe(1);
  });

  test("dataset of 25 – d", () => {
    const root = createTrie(CITY_NAMES.slice(0, 25));
    const completions = root.complete("d");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["dallas", "detroit", "denver"]).length
    ).toBe(3);
  });

  test("dataset of 200 – new", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("new");
    expect(completions.length).toBe(5);
    expect(
      _.intersection(completions, [
        "new york",
        "new orleans",
        "new haven",
        "newark",
        "newport news"
      ]).length
    ).toBe(5);
  });

  test("dataset of 200 – bo", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("bo");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["boston", "boise city"]).length).toBe(
      2
    );
  });

  test("dataset of 500 – sal", () => {
    const root = createTrie(CITY_NAMES.slice(0, 500));
    const completions = root.complete("sal");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["salt lake city", "salem", "salinas"]).length
    ).toBe(3);
  });

  test("dataset of 925 – san", () => {
    const root = createTrie(CITY_NAMES);
    const completions = root.complete("san");
    expect(completions.length).toBe(30);
    console.log(JSON.stringify({ completions }));
    expect(
      _.intersection(completions, [
        "san antonio",
        "san angelo",
        "san diego",
        "san jose",
        "san jacinto",
        "san francisco",
        "san bernardino",
        "san buenaventura",
        "san bruno",
        "san mateo",
        "san marcos",
        "san leandro",
        "san luis obispo",
        "san ramon",
        "san rafael",
        "san clemente",
        "san gabriel",
        "santa ana",
        "santa clarita",
        "santa clara",
        "santa cruz",
        "santa rosa",
        "santa maria",
        "santa monica",
        "santa barbara",
        "santa fe",
        "santee",
        "sandy",
        "sandy springs",
        "sanford"
      ]).length
    ).toBe(30);
  });
});

describe.skip("edge cases", () => {
  test("handle whole words – seattle", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("seattle");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["seattle"]).length).toBe(1);
  });

  test("handle no match", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("no match");
    expect(completions.length).toBe(0);
  });

  test("handle words that are a subset of another string – salin", () => {
    const root = createTrie(CITY_NAMES.slice(0, 800));
    const completions = root.complete("salin");
    console.log(completions);
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["salina", "salinas"]).length).toBe(2);
  });
});
