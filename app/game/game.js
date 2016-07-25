'use strict';

angular.module('myApp.game', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/game.html',
            controller: 'GameCtrl'
        });
    }])

    .controller('GameCtrl', ['$scope',function ($scope) {


        var categories = [
            {id: 1, title: 'pirmas', parent: 0},
            {id: 2, title: 'pirmas', parent: 0},
            {id: 3, title: 'antras', parent: 1},
            {id: 4, title: 'ketvirtas', parent: 3},
            {id: 5, title: 'penktas', parent: 4},
            {id: 6, title: 'penktas', parent: 4},
            {id: 7, title: 'ketvirtas', parent: 3},
            {id: 8, title: 'trecias', parent: 2}
        ]

        function makeTree(arr, parent) {
            var out = []
            for(var i in arr) {
                if(arr[i].parent == parent) {
                    var children = makeTree(arr, arr[i].id)
                    if(children.length) {
                        arr[i].children = children
                    }
                    out.push(arr[i])
                }
            };
            return out
        }
        $scope.testTree = makeTree(categories, 0);
        //console.log(makeTree(categories, 0));
        $("#one").text(JSON.stringify(makeTree(categories, 0)));


    }]);