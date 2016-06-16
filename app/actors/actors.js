'use strict';

angular.module('myApp.actors', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/actors/:actorId', {
    templateUrl: 'actors/actors.html',
    controller: 'ActorsCtrl'
  });
}])

.controller('ActorsCtrl', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http) {

$scope.actorName = $routeParams.actorId;
$scope.actorUrl = 'http://www.omdbapi.com/?t='+$scope.actorName+'&y=&plot=short&r=json'

	/*
	* Imdb Api Call fro Actors
	*/
	$http({
		method : 'GET',
		url : $scope.actorUrl
	}).then(function successCallback(response) {
			$scope.info = response.data;
			
			console.log($scope.info);
	}, function errorCallback(response) {
		$scope.error = 'Can`t load info';
	});

	$http({
		method : 'GET',
		url : 'DB/test.json'
	}).then(function successCallback(response) {
		$scope.filmai = response.data.filmai;
		
		console.log($scope.filmai);
	}, function errorCallback(response) {
		$scope.error = 'Can`t load movies';
	});

}]);