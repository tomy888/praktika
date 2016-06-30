'use strict';

angular.module('myApp.step3', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart/step3', {
            templateUrl: 'cart/step3/step3.html',
            controller: 'Step3Ctrl'
        });
    }])

    .controller('Step3Ctrl', ['$scope','moviesCart', 'purchaseHistory', function ($scope, moviesCart, purchaseHistory) {

        $scope.cartData = [];
        $scope.priceToPay = 0;

        $scope.cartData = moviesCart.cart;

        $scope.totalPrice = function () {
            for(var i=0;i<$scope.cartData.length;i++){
                    $scope.priceToPay = Number($scope.priceToPay) + Number($scope.cartData[i].Price);
            }
        }
        $scope.totalPrice();

        $scope.toHistory = function (data) {
            var getDatetime = new Date().toLocaleString();
            for(var i = 0; i<data.length;i++){
                purchaseHistory.addToBoughtMovies({name:data[i].Movie,amount:data[i].Amount,price:data[i].Price,date:getDatetime});
            }
        }

    }]);