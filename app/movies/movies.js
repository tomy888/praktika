'use strict';

angular.module('myApp.movies', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movies', {
            templateUrl: 'movies/movies.html',
            controller: 'MoviesCtrl'
        });
    }])

    .controller('MoviesCtrl', ['$scope', '$http', '$uibModal', '$log', 'moviesCart', function ($scope, $http, $uibModal, $log, moviesCart) {

        $scope.filmai = null;
        $scope.selectedMovie = null;
        $scope.description = 'No description';

        $scope.addOrder = function (filmai) {
            var order = 0;
            while (filmai[order]) {
                filmai[order].order = order;
                order++;
            }
        }

        $http({
            method: 'GET',
            url: 'DB/test.json'
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
                controller: function ($scope, $uibModalInstance, description) {
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

        $scope.switchMovies = function (index, direction) {
            var o1 = $scope.filmai[index].order;
            var o2 = $scope.filmai[index + direction].order;
            $scope.filmai[index].order = o2;
            $scope.filmai[index + direction].order = o1;
        }

        $scope.whichMovie = function (movieName) {
            $scope.selectedMovie = movieName;
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        $scope.addMovie = function (poster,name,amount,price) {
           if(!isNumber(amount) || amount % 1 !== 0){
               $scope.errorCartTextAlert = "Wrong amount!";
               $scope.successCartTextAlert = null;
           }else{
               moviesCart.addToCart({Poster:poster,Movie:name,Amount:amount,Price:((amount*price)).toFixed(2)});
               $scope.successCartTextAlert = "Movie added to cart!";
               $scope.errorCartTextAlert = null;
           }

        }

        console.log(moviesCart.cart);
        
        

    }]);