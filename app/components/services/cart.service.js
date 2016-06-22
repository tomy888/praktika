'use strict';

angular.module('myApp.services', []).factory('moviesCart', function() {
    var cart = [];
    function addToCart(item) {
        cart.push(item);
    }
    return {
        cart:cart,
        addToCart:addToCart
    };

});