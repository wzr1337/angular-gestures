'use strict';

angular.module('angularGesturesDemoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.type = '--';
    $scope.handleGesture = function($event) {
      console.log('button event', $event);
      $scope.type = $event.type;
      $event.srcEvent.stopPropagation();
    };
    $scope.handleParentGesture = function($event) {
      console.log('parent event', $event);
      $scope.type = $event.type;
    };
  });
