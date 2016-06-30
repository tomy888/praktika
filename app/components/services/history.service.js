'use strict';

angular.module('myApp.historyService', []).service('purchaseHistory', function() {
    var boughtMovies = [];
    function addToBoughtMovies(item) {
        boughtMovies.push(item);
    }
    return {
        boughtMovies:boughtMovies,
        addToBoughtMovies:addToBoughtMovies
    };

});