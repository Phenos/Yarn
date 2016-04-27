yarn.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            var vA = a[field];
            var vB = b[field];
            if (angular.toString(vA)) {
                vA = vA.toLowerCase();
            }
            if (angular.toString(vB)) {
                vB = vB.toLowerCase();
            }
            return (vA > vB ? 1 : -1);
        });
        if (reverse) {
            filtered.reverse();
        }
        return filtered;
    };
});
