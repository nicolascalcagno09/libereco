/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
 import util from "util";

export function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }
    return tempArray;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function checkDuplicateInObject(propertyName, inputArray) {
  var seenDuplicate = false,
      testObject = {};
  
  inputArray.map(function(item) {
    var itemPropertyName = item[propertyName]; 
    if (itemPropertyName in testObject) {
      testObject[itemPropertyName].duplicate = true;
      item.duplicate = true;
      seenDuplicate = true;
    }
    else {
      testObject[itemPropertyName] = item;
      delete item.duplicate;
    }
  });
  
  return seenDuplicate;
}

export function logObjectToString(object) {

  if (typeof object === "string" || object instanceof String) return object;

  return util.inspect(object);
};
