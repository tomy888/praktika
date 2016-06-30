'use strict';

angular.module('myApp.step1', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart/step1', {
            templateUrl: 'cart/step1/step1.html',
            controller: 'Step1Ctrl'
        });
    }])

    .controller('Step1Ctrl', ['$scope', function ($scope) {
        $scope.next = null;

    $scope.submited = function () {
        $scope.next = true;
    }

    }]);