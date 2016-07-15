'use strict';

angular.module('myApp').directive('canvasDrv', ['$timeout','$interval', function ($timeout,$interval) {

    function link(scope, element, attr) {

        var radius = 15;
        var result = 0;
        var missed = 0;
        var width = 800;
        var height = 600;
        var rectWidth = 600;
        var rectHeight = 600;
        var circleX;
        var circleY;
        var circle;
        var rect;
        var levels = [];
        var counter = 1;
        var gameSpeed = 2000;

        var canvas = $("#testCanvas");
        var paper = Raphael("testCanvas", width, height);

        var gameInt = undefined;

        var game = function (speed) {
            gameInt = $interval(function randomCoordinates() {
                circleX = Math.round((Math.random() * rectWidth - 30) + radius);
                circleY = Math.round((Math.random() * rectHeight - 30) + radius);
                levelCounter();
                if(result>=missed){
                    newCircle();
                }else gameOver();

            }, speed);
        }
        game(gameSpeed);


        function newCircle() {
            paper.clear();
            newRect();
            circle = paper.circle(circleX, circleY, radius);
            circle.attr("fill", "red");
            circle.toFront();
            circle.click(function(e){
                result++;
                paper.clear();
                newRect();
                //console.log('Result:',result);
                //console.log('Level:',counter,'Speed:',gameSpeed);
            })
        };

        function levelCounter() {
            for(var i=1;i<20;i++){
                levels[i] = (i*5);
            }

            if(result === levels[counter]){
                levelUp();
            }
        }
        function newRect() {
            printResult();
            rect = paper.rect(0, 0, rectWidth, rectHeight);
            rect.attr("fill", "#eee");
            rect.attr("fill-opacity", 0);
            rect.toBack();
            rect.click(function (e) {
                missed++;
                //console.log('Missed:',missed);
            });
        }

        function levelUp() {
            gameSpeed-=500;
            counter++;
            $interval.cancel(gameInt);
            game(gameSpeed);
        }

        function printResult() {
            paper.text(630, 25,"Level: " + counter);
            paper.text(630, 10,"Result: " + result);
            paper.text(630, 40,"Missed: " + missed);
            //paper.print(630, 55, "print", paper.getFont("Museo"), 30).attr({fill: "#fff"});
        }

        function gameOver() {
            paper.clear();
            newRect();
            paper.text(300, 300,"GAME OVER");
        }


    }

    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link: link,
        template: '<div id="testCanvas" style="border: 1px solid #E0E0E0;"></div>'
    }
}]);
