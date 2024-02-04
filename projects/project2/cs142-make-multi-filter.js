function cs142MakeMultiFilter(originalArray) {
  let currentArray = originalArray.map((x) => x);
  function arrayFilterer(filterCriteria, callback) {
    if (typeof filterCriteria == "undefined") {
      return currentArray;
    }
    if (typeof filterCriteria == "function") {
      currentArray = currentArray.filter(filterCriteria);
    }
    if (typeof callback == "function") {
      callback.call(originalArray, currentArray);
    }
    return arrayFilterer;
  }
  return arrayFilterer;
}
