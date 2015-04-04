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
          [Hammer.Tap,{ event: 'tap'}],
          [Hammer.Tap, { event: 'doubletap', taps: 2 }, [], ['tap']],
          [Hammer.Press],
          [Hammer.Pan]
        ]
    });
  });
