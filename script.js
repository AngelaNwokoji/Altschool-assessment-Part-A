
//Problem 1
//Write deepEqual(objA, objB) that returns true if two objects have the same keys and values recursively (including nested objects), without using JSON.stringify

function deepEqual(objA, objB) {
  const key1 = Object.keys(objA)
  const key2 = Object.keys(objB)

  if (key1.length !== key2.length){
    return false
  }

  for (let i = 0; i < key1.length; i++){
    const key = key1[i]
    const valA = objA[key]
    const valB = objB[key]

    const bothObjects = typeof valA === 'object' && valA !== null &&
                         typeof valB === 'object' && valB !== null

    if (bothObjects) {
      if (!deepEqual(valA, valB)) {
        return false
      }
    } else if (valA !== valB) {
      return false
    }
  }

  return true
}

//Problem 2
//Write diffObjects(oldObj, newObj) that returns an object describing what changed: { added: {...}, removed: {...}, changed: {...} }, comparing only top-level keys.

function diffObjects(oldObj, newObj) {
  const added = {};
  const removed = {};
  const changed = {};

  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  for (const key of oldKeys) {
    if (!(key in newObj)) {
      removed[key] = oldObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      changed[key] = newObj[key]; // just the new value
    }
  }

  for (const key of newKeys) {
    if (!(key in oldObj)) {
      added[key] = newObj[key];
    }
  }

  return { added, removed, changed };
}


console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))
// { added: { city: 'Kingston' }, removed: { country: 'Jamaica' }, changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }


// Problem 4
// Write createCounter() that returns an object with increment(), decrement(), and value as a getter (not a plain property), keeping the internal count truly private via closure.
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    get value() {
      return count;
    }
  };
}

const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value)  // 1
console.log(counter.count)  // undefined — not directly accessible