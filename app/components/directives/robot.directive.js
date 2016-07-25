'use strict';

angular.module('myApp').directive('robotDrv', function (robotService) {

    function link(scope, element, attr) {
        var c = element[0].getContext('2d');
        var symbol;
        var symbolSize;
        var styles = ['Arial','Lucida Handwriting','Showcard Gothic','Wide Latin','Perpetua Titling MT','MS Gothic'];
        var test = [14,20,30]
        var randomNumber;
        var string = '';
        var canvasWidth = 500;
        var style = '';

        function randomSymbol()
        {
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            symbol = possible.charAt(Math.floor(Math.random() * possible.length));
        }

        function randomParameters () {
            symbolSize = Math.floor((Math.random() * 50) + 30);
            style = styles[Math.floor(Math.random() * 5)];
        }

        function generateString() {
            c.clearRect(0,0,500,100);
            string = '';
            for(var i = 0; i<5; i++){
                randomSymbol();
                randomParameters();
                print(i);
                string += symbol;
            }
            robotService.addToRobotService(string);
        }

        function print(pixels) {
            c.font = ''+symbolSize+'px '+style+'';
            c.fillText(symbol, (pixels*canvasWidth)/5, 70);
        }

        generateString();

        attr.$observe('seed',function(newValue,oldValue){
            if(newValue !== oldValue){
                generateString();
            }

        })
    }

    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link: link,
        template: '<canvas id="robot" width="500" height="100" style="border: 1px solid #E0E0E0;"></canvas>'
    }
});