'use strict';

angular.module('myApp').directive('elementDrv', function () {

    return {
        link: function (scope, element, attr) {
            element.addClass('card-number');

            /*var space = function (el, after) {
                after = after || 4;
                var v = el.value.replace(/[^\dA-Z]/g, ''),
                    reg = new RegExp(".{" + after + "}","g")
                el.value = v.replace(reg, function (a) {
                    return a + ' ';
                });
            }*/


                console.log(element);
            element.bind('blur', function () {
                var creditNumber = [], value = element.val().replace(/ /g, '');
                for (var i = 0; i < value.length; i += 4) {
                    creditNumber.push(value.substring(i, i + 4));
                }
                element.val(creditNumber.join(' '));
            });

        }
    }
});