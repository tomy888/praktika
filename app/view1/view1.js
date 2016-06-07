'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

	$scope.filmai = null;

	$http({
		method : 'GET',
		url : 'DB/test.json'
	}).then(function successCallback(response) {
			$scope.filmai = response.data.filmai;
			$scope.actors = response.data.actors;
	  }, function errorCallback(response) {
	    	$scope.error = 'Can`t load movies';
	  });

}]);