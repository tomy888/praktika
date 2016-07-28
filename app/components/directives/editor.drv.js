'use strict';

angular.module('myApp').directive('editorDrv', ['$compile', function ($compile) {

    return {
        link: function ($scope, element, attr) {

            var newText = '';

            $scope.modifySelection = function () {
                var textarea = document.getElementById("commentsTextArea");

                if (textarea.selectionStart != textarea.selectionEnd) {
                    newText = textarea.value.substring(0, textarea.selectionStart) +
                        '<b>' + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd) + '</b>' +
                        textarea.value.substring(textarea.selectionEnd);
                    textarea.value = newText;
                    $scope.$parent.rootModel.comment = newText;
                    //console.log($scope.$parent);
                }
            };

            $scope.doBold = function () {
                element.addClass('bold-text');
            };

            var button = '<button ng-click="modifySelection();">Bold</button>';

            var content = $compile(button)($scope);
            element.parent().append(content);

        }
    }
}]);