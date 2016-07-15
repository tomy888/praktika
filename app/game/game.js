'use strict';

angular.module('myApp.game', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/game.html',
            controller: 'GameCtrl'
        });
    }])

    .controller('GameCtrl', [ function () {



    }]);