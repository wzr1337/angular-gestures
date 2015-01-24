'use strict';

angular.module('angularGesturesDemoApp', ['angular-gestures', 'ngRoute'])
  .config(function ($routeProvider, hammerDefaultOptsProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    hammerDefaultOptsProvider.set({
        recognizers: [
          [Hammer.Tap, {time: 250}],
          [Hammer.Press],
          [Hammer.Pinch],
          [Hammer.Pan],
          [Hammer.Rotate],
          [Hammer.Swipe]
        ]
    });
  });
