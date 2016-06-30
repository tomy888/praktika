'use strict';

angular.module('myApp.services', []).service('moviesCart', function() {
    var cart = [];
    function addToCart(item) {
        for(var i=0;i<cart.length;i++){
            if(cart[i].Movie == item.Movie){
                cart[i].Amount += item.Amount;
                cart[i].Price = Number(cart[i].Price) + Number(item.Price);
                return;
            }
        }
        cart.push(item);
    }
    return {
        cart:cart,
        addToCart:addToCart
    };

});