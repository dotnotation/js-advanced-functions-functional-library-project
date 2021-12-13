function checker(collection){
    return collection instanceof Array ? collection : Object.values(collection);
    // The ternary operator starts with conditional expression followed by the ? operator. The second part (after ? and before :) will be executed if the condition turns out to be true. Suppose, the condition returns false, then the third part (after :) will be executed.
}

function myEach(collection, callback){
    let array = checker(collection)
    for (let i = 0; i < array.length; i++){
        callback(array[i])
    }
    return collection
}

function myMap(collection, callback){
    let array = checker(collection)
    let newArray = []
    for (let i=0; i < array.length; i++){
        newArray.push(callback(array[i]))
    }
    return newArray
}

function myReduce(collection, callback, acc){
    let array = checker(collection)

    if (!acc){
        acc = array[0]
        array = array.slice(1)
    }

    for (let i=0; i < array.length; i++){
        acc = callback(acc, array[i], array)
    } 
    return acc
}

function myFind(collection, predicate){
    let array = checker(collection)

    for (let i=0; i < array.length; i++){
        if (predicate(array[i])){
            return array[i]
        }
    }
}

function myFilter(collection, predicate){
    let array = checker(collection)
    let filtered = []

    for (let i=0; i < array.length; i++){
        if (predicate(array[i])){
            filtered.push(array[i])
        }
    }
    return filtered 
}

function mySize(collection){
    let array = checker(collection)
    return array.length 
}

function myFirst(collection, n){
    let array = checker(collection)
    
    if (n) {
        return array.slice(0, n)
      } else {
        return array[0]
      }
}

function myLast(collection, n){
    let array = checker(collection)
    let last = array.length - 1

    if (n){
        return array.slice(array[last - n], array[last])
    } else {
        return array[last]
    }
}

function myKeys(object){
    let objectKeys = []

    for (const key in object) {
        objectKeys.push(key)
    }
    return objectKeys
}

function myValues(object){
    let objectValues = []

    for (const value in object){
        objectValues.push(object[value])
    }
    return objectValues
}

const mySortBy = function (arr, callback) {
    const newArr = [...arr];
    return newArr.sort(function (a, b) {
      if (callback(a) > callback(b)) {
        return 1;
      } else if (callback(b) > callback(a)) {
        return -1;
      } else {
        return 0;
      }
    });
  };

// unpack is a helper function for myFlatten that is used when shallow is true
// It takes each element of the input array (whether it's a primitive value or
// an array) and pushes it into the output array
const unpack = function (receiver, arr) {
    for (let val of arr) {
      receiver.push(val);
    }
  };
  
  // myFlatten handles two separate cases: shallow=true and shallow=false
  // For the true case, the top-level elements are simply pushed into newArr using
  // the unpack helper function
  // For the false case, myFlatten is called recursively for each element
  const myFlatten = function (collection, shallow, newArr = []) {
    if (shallow) {
      for (let val of collection) {
        Array.isArray(val) ? unpack(newArr, val) : newArr.push(val);
      }
    } else {
      // shallow = false (recursive case)
      for (let val of collection) {
        if (Array.isArray(val)) {
          // Below, we pass newArr as an argument when we call myFlatten recursively
          // because we need to retain the values that were pushed in previous calls
          myFlatten(val, false, newArr);
        } else {
          newArr.push(val);
        }
      }
    }
    return newArr;
  };