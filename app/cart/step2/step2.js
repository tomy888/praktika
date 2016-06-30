'use strict';

angular.module('myApp.step2', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart/step2', {
            templateUrl: 'cart/step2/step2.html',
            controller: 'Step2Ctrl'
        });
    }])

    .controller('Step2Ctrl', ['$scope', function ($scope) {
        $scope.next = null;

        $scope.submited = function () {
            $scope.next = true;
        }


    }]);