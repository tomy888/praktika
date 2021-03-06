'use strict';

angular.module('myApp.commentsDrv', ['ngRoute']).directive('commentsDrv', function () {
    return {
        restrict: 'E',
        scope: {
            topicId: '@'
        },
        templateUrl: 'components/directives/templates/comments-template.html',
        controller: function ($scope, $http, $cookies, $sce) {
            var cookie;
            var commentsUrl;
            var getCommentsByTopicUrl;
            $scope.loggedIn = false;
            $scope.selectedComment = null;
            $scope.answerEnabled = false;
            $scope.answersTree = [];
            $scope.comment = '';

            if ($cookies.get('praktika_token')) {
                $scope.loggedIn = true;
                getCommentsByTopic();
            }

            function takeCookieData() {
                $cookies.get('praktika_token') ? cookie = JSON.parse($cookies.get('praktika_token')) : cookie = false;
                commentsUrl = 'http://530309.s.dedikuoti.lt:9001/api/comments/?token=' + cookie.token + '';
                getCommentsByTopicUrl = 'http://530309.s.dedikuoti.lt:9001/api/comments/' + $scope.topicId + '/?token=' + cookie.token + '';
            };

            function getCommentsByTopic() {
                takeCookieData();
                $http.get(getCommentsByTopicUrl).success(function (response) {
                    $scope.allComments=response;
                    $scope.answersTree = makeAnswersTree($scope.allComments,undefined);
                }).error(function (response) {
                    console.log(response);

                });
            };

            function makeAnswersTree(arr, parent) {
                var out = []
                for(var i in arr) {
                    arr[i].created_at = new Date(arr[i].created_at).toLocaleString();
                    if(arr[i].parentId == parent) {
                        var children = makeAnswersTree(arr, arr[i]._id)
                        if(children.length) {
                            arr[i].children = children
                        }
                        out.push(arr[i])
                    }
                };
                return out
            }
            $scope.rootModel = {};
            $scope.commentData = function (id) {
                $scope.testComment = {
                    "userid": cookie.id,
                    "username": cookie.username,
                    "message": $scope.rootModel.comment,
                    "parentId": id,
                    "topicId": $scope.topicId
                };
                createComment();
            };

            function createComment() {
                $http.post(commentsUrl, $scope.testComment).success(function (response) {
                    $scope.answerEnabled = false;
                    getCommentsByTopic();
                }).error(function (response) {
                    console.log(response);

                });
            };

            $scope.whichComment = function (id) {
                $scope.selectedCommentId = id;
            };

            $scope.enableAnswer = function () {
                $scope.answerEnabled = true;
            };

            $scope.closeAnswerBox = function () {
                $scope.answerEnabled = false;
                $scope.selectedCommentId = null;
            }

            $scope.trustedHTML = function(message){
                return $sce.trustAsHtml(message);
            };
        }
    };
});