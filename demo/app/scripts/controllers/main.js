'use strict';

angular.module('angularGesturesDemoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.type = '--';
    $scope.handleGesture = function($event) {
      console.log($event.type)
      $scope.type = $event.type;
    }
  });
