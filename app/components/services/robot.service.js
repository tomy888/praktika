'use strict';

angular.module('myApp.robotService', []).service('robotService', function() {
    var generatedString = '';
    var addToRobotService = function(string) {
        generatedString = string;
    };

    var getGeneratedString = function () {
        return generatedString;
    };

    return {
        getGeneratedString:getGeneratedString,
        addToRobotService:addToRobotService,
    };

});