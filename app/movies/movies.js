'use strict';

angular.module('myApp.movies', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movies', {
    templateUrl: 'movies/movies.html',
    controller: 'MoviesCtrl'
  });
}])

.controller('MoviesCtrl', ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log) {

	$scope.filmai = null;
	$scope.selectedMovie = null;
	$scope.description = 'No description';
	$scope.addOrder = function(filmai){
		var order = 0;
		while(filmai[order]){
			filmai[order].order = order;
			order++;
		}
	}

	$http({
		method : 'GET',
		url : 'DB/test.json'
	}).then(function successCallback(response) {
			$scope.filmai = response.data.filmai;
			$scope.addOrder($scope.filmai);
			
			console.log($scope.filmai);
	  }, function errorCallback(response) {
	    	$scope.error = 'Can`t load movies';
	  });

	$scope.open = function (about) {
		$scope.description = about;

    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'movies/modal/myModalContent.html',
			controller: function($scope, $uibModalInstance, description) {
				$scope.description = description;
				$scope.cancel = function () {
    				$uibModalInstance.dismiss('cancel');
  				};
			},
			size: 'lg',
			resolve: {
			description: function () {
					return $scope.description;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			//
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
  };

  $scope.switchMovies = function(index, direction) {
	var o1 = $scope.filmai[index].order;
	var o2 = $scope.filmai[index+direction].order;
	$scope.filmai[index].order = o2;
	$scope.filmai[index+direction].order = o1;
}
	
}]);