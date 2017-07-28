var numberArray = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("number array", numberArray);

var filterNumberedArray = numberArray.filter(function (value) {
    return value > 5;
});
console.log(filterNumberedArray);