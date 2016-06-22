'use strict';

angular.module('myApp.cart', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: 'cart/cart.html',
            controller: 'CartCtrl'
        });
    }])

    .controller('CartCtrl', ['$scope', '$http','moviesCart', function ($scope, $http, moviesCart) {
        $scope.cartData = [];
        console.log(moviesCart.cart);
        $scope.cartData = moviesCart.cart;

        $scope. deleteMovie = function (index) {
            delete $scope.cartData[index];
        }

    }]);