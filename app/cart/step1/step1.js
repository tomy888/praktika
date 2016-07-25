'use strict';

angular.module('myApp.step1', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart/step1', {
            templateUrl: 'cart/step1/step1.html',
            controller: 'Step1Ctrl'
        });
    }])

    .controller('Step1Ctrl', ['$scope', 'robotService', function ($scope, robotService) {
        $scope.next = null;

        $scope.submited = function () {
            $scope.next = true;
        };
        var computerString = '';

        $scope.getRandomString = function () {
            computerString = robotService.getGeneratedString();
            console.log(computerString);
        };

        $scope.match = function () {
            if(computerString === $scope.buyerString){
                $scope.submited();
            }else{
                $scope.errorAlert = 'Wrong security text!';
                $scope.getNewSeed();
            }
        };

        $scope.randomSeed = Math.random();
        $scope.getNewSeed = function () {
            $scope.randomSeed = Math.random();
        };


    }]);