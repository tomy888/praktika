'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:actorId', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http) {

$scope.actorName = $routeParams.actorId;
$scope.actorUrl = 'http://www.omdbapi.com/?t='+$scope.actorName+'&y=&plot=short&r=json'

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