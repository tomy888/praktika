'use strict';

angular.module('myApp.cart', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: 'cart/cart.html',
            controller: 'CartCtrl'
        });
    }])

    .controller('CartCtrl', ['$scope','moviesCart', function ($scope, moviesCart) {
        $scope.cartData = [];
        $scope.cartData = moviesCart.cart;

        $scope.deleteMovie = function (index) {
            moviesCart.cart.splice(index, 1);
        }

    }]);