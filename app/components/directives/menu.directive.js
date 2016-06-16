'use strict';

angular.module('myApp.directives', ['ngRoute']).directive('moviesMenu', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/components/directives/templates/menu-template.html',
    controller: function() {

    }
  };
});