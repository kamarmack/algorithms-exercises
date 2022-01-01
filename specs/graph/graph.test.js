// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/

const { getUser } = require('./jobs');

// Assumes degreesOfSeparation at least 1
const findMostCommonTitle = (myId, degreesOfSeparation) => {
  const me = getUser(myId);
  const title_counter = { [me.title]: 1 };
  const touched = { [myId]: true };
  
  // BAD BAD BAD
  // THIS MODIFIES THE "me" VARIABLE – MAKE A COPY
  // const queue = me.connections;

  // GOOD GOOD GOOD
  const queue = [].concat(me.connections);


  while (degreesOfSeparation > 0) {
    const temp = [];
    while (queue.length > 0) {
      const connection_id = queue.shift();
      if (!touched[connection_id]) {
        const connected_user = getUser(connection_id);
        const connected_user_title = connected_user.title;
        if (title_counter[connected_user_title]) {
          title_counter[connected_user_title]++;
        } else {
          title_counter[connected_user_title] = 1;
        }
        touched[connection_id] = true;
        temp.push(...connected_user.connections.filter(i => !touched[i]));
      }
    }
    queue.push(...temp);
    degreesOfSeparation--;
  }
  const title_keys = Object.keys(title_counter);
  let most_common_title_key = title_keys[0];
  for (let i = 1; i < title_keys.length; i++) {
    const check_title_key = title_keys[i];
    if (title_counter[check_title_key] > title_counter[most_common_title_key]) {
      most_common_title_key = check_title_key;
    }
  }
  return most_common_title_key;
};

// unit tests
// do not modify the below code
describe.skip("findMostCommonTitle", function () {
  // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010
  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

test.skip("extra credit", function () {
  test("user 1 with 7 degrees of separation - this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
