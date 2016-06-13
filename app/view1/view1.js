'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log) {

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

	$scope.showMoreOrLess = function(filmasName) {

		$scope.selectedMovie = filmasName;
	}

	$scope.open = function (about) {
		$scope.description = about;

    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'view1/modal/myModalContent.html',
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