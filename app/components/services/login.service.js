'use strict';

angular.module('myApp.loginService', []).service('loginService', function() {
    var responseData = '';
    var addResponseData = function(item) {
        responseData = item;
        //console.log(responseData);
    };
    var getToken = function () {
        return responseData;
    };
    return {
        token:getToken,
        addResponseData:addResponseData
    };

});