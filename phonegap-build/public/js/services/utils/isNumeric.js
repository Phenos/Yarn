yarn.service("isNumeric", function () {
   return function isNumeric(n) {
       return !isNaN(parseFloat(n)) && isFinite(n);
   }
});