'use strict';

angular.module('myApp.403', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/403', {
            templateUrl: 'status/403/403.html',
            controller: '403Ctrl'
        });
    }])

    .controller('403Ctrl', [ function () {



    }]);