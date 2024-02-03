function cs142MakeMultiFilter(originalArray) {
  function arrayFilterer(filterCriteria, callback=x=>x) {
    // let currentArray = originalArray.map(x=>x);
    if (typeof filterCriteria == "undefined") {
      return originalArray;
    }
    let currentArray = originalArray.filter(filterCriteria);
    if (typeof callback == "function") {
      Object.setPrototypeOf(currentArray, this);
      callback(currentArray);
    }
    return arrayFilterer;
  }

  return arrayFilterer;
}