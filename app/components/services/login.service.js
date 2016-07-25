'use strict';
//angular.module('myApp.loginService', []);
angular.module('myApp.loginService', []).service('loginService', loginService);
function loginService($cookies, $http, $q) {
  /*  var name = false;
    var guestName = function () {
        return name;
    };*/
    /*var login = function (guest) {
        var newUser = {"username": guest.username, "password": guest.password};
        var success = {};


        $http.post("http://localhost:9001/api/authenticate", newUser).success(function (data, status) {
            //console.log(data, status);
            success = data;
            //console.log($scope.success.message)
            if (success.success == true) {
                name = guest.username;
                addTokenToCookie();
            }
            else {
                var errorTextAlert = "Password or username is incorrect!";
                console.log(errorTextAlert);
            }
        }).error(function (data, status) {
            //console.log(data, status);
        });


        var addTokenToCookie = function () {

            $cookies.put('praktika_token', success.token);
        };

    };*/

    var errorTextAlert = false;
    var errorText = function () {
        return errorTextAlert;
    };
    var setToken = function(token, username,id) {
        $cookies.put('praktika_token', JSON.stringify({token: token, username: username,id: id}));

        //console.log(JSON.parse($cookies.get('praktika_token')));
    };

    var deferred = $q.defer();
    var loginUser = function (guest) {
        var newUser = {"username": guest.username, "password": guest.password};
        deferred = $q.defer();
        return $http.post('http://localhost:9001/api/authenticate', newUser)
            .then(function (response) {
                //console.log(response);
                errorTextAlert = response.data.message;
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                //console.log(response.data);
                //console.log(deferred.promise);
                return deferred.promise;
            }, function (response) {
                console.log(response.data.message);
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            });
    };
    return {
        //guestName: name,
        loginUser: loginUser,
        setToken: setToken,
        errorText: errorText
    };
}
loginService.$inject = ['$cookies', '$http', '$q'];