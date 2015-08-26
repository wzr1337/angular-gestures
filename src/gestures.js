/**
 * Inspired by AngularJS' implementation of "click dblclick mousedown..."
 *
 * This ties in the Hammer 2 events to attributes like:
 *
 * hm-tap="add_something()" hm-swipe="remove_something()"
 *
 * and also has support for Hammer options with:
 *
 * hm-tap-opts="{hold: false}"
 *
 * or any other of the "hm-event" listed underneath.
 */

'use strict';
(function (root, factory) {
  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['angular', 'Hammer'], function (angular, Hammer) {
      return factory({}, angular, Hammer);
    });
  }
  // Node.js
  else if (typeof exports === 'object') {
    module.exports = factory({}, require('angular'), require('Hammer'));
  }
  // Angular
  else if (angular) {
    factory(root, root.angular, root.Hammer);
  }
}(this,function(global,angular,Hammer){
  angular.module('angular-gestures', []);

  var HGESTURES = {
    hmDoubleTap: 'doubletap',
    hmDragstart: 'panstart', // will bedeprecated soon, us Pan*
    hmDrag: 'pan', // will bedeprecated soon, us Pan*
    hmDragUp: 'panup', // will bedeprecated soon, us Pan*
    hmDragDown: 'pandown', // will bedeprecated soon, us Pan*
    hmDragLeft: 'panleft', // will bedeprecated soon, us Pan*
    hmDragRight: 'panright', // will bedeprecated soon, us Pan*
    hmDragend: 'panend', // will bedeprecated soon, us Pan*
    hmPanstart: 'panstart',
    hmPan: 'pan',
    hmPanUp: 'panup',
    hmPanDown: 'pandown',
    hmPanLeft: 'panleft',
    hmPanRight: 'panright',
    hmPanend: 'panend',
    hmHold: 'press',
    hmPinch: 'pinch',
    hmPinchIn: 'pinchin',
    hmPinchOut: 'pinchout',
    hmPress: 'press',
    hmRelease: 'release',
    hmRotate: 'rotate',
    hmSwipe: 'swipe',
    hmSwipeUp: 'swipeup',
    hmSwipeDown: 'swipedown',
    hmSwipeLeft: 'swipeleft',
    hmSwipeRight: 'swiperight',
    hmTap: 'tap',
    hmTouch: 'touch',
    hmTransformstart: 'transformstart',
    hmTransform: 'transform',
    hmTransformend: 'transformend'
  };

  var HRECOGNIZERS = {
    hmDoubleTap: [Hammer.Tap, 'Hammer.Tap'],
    hmDragstart: [Hammer.Pan, 'Hammer.Pan'],
    hmDrag: [Hammer.Pan, 'Hammer.Pan'],
    hmDragUp: [Hammer.Pan, 'Hammer.Pan'],
    hmDragDown: [Hammer.Pan, 'Hammer.Pan'],
    hmDragLeft: [Hammer.Pan, 'Hammer.Pan'],
    hmDragRight: [Hammer.Pan, 'Hammer.Pan'],
    hmDragend: [Hammer.Pan, 'Hammer.Pan'],
    hmPanstart: [Hammer.Pan, 'Hammer.Pan'],
    hmPan: [Hammer.Pan, 'Hammer.Pan'],
    hmPanUp: [Hammer.Pan, 'Hammer.Pan'],
    hmPanDown: [Hammer.Pan, 'Hammer.Pan'],
    hmPanLeft: [Hammer.Pan, 'Hammer.Pan'],
    hmPanRight: [Hammer.Pan, 'Hammer.Pan'],
    hmPanend: [Hammer.Pan, 'Hammer.Pan'],
    hmHold: [Hammer.Press, 'Hammer.Press'],
    hmPinch: [Hammer.Pinch, 'Hammer.Pinch'],
    hmPinchIn: [Hammer.Pinch, 'Hammer.Pinch'],
    hmPinchOut: [Hammer.Pinch, 'Hammer.Pinch'],
    hmPress: [Hammer.Press, 'Hammer.Press'],
    hmRotate: [Hammer.Rotate, 'Hammer.Rotate'],
    hmSwipe: [Hammer.Swipe, 'Hammer.Swipe'],
    hmSwipeUp: [Hammer.Swipe, 'Hammer.Swipe'],
    hmSwipeDown: [Hammer.Swipe, 'Hammer.Swipe'],
    hmSwipeLeft: [Hammer.Swipe, 'Hammer.Swipe'],
    hmSwipeRight: [Hammer.Swipe, 'Hammer.Swipe'],
    hmTap: [Hammer.Tap, 'Hammer.Tap']
  };

  var VERBOSE = false;

  angular.forEach(HGESTURES, function(eventName, directiveName) {
    angular.module('angular-gestures').directive(directiveName, ['$parse', '$log', '$timeout', 'hammerDefaultOpts', function($parse, $log, $timeout, hammerDefaultOpts) {
      return function(scope, element, attr) {
        var handler;
        attr.$observe(directiveName, function(value) {
          var callback = $parse(value);
          var opts = $parse(attr[directiveName + 'Opts'])(scope, {});
          var defaultOpts = angular.copy(hammerDefaultOpts);

          angular.extend(defaultOpts, opts);

          if (angular.isUndefined(element.hammertime)) {

            // validate that needed recognizer is enabled
            var recognizers = angular.isDefined(defaultOpts.recognizers) ? defaultOpts.recognizers : [];
            var recognizer = HRECOGNIZERS[directiveName];
            if(angular.isDefined(recognizer)) {
              var enabled = false;
              angular.forEach(recognizers, function(r) {
                if (recognizer[0] === r[0]) {
                  if (angular.isUndefined(r[1].enable) || r[1].enable === true) {
                    enabled = true;
                  }
                }
              });
              if (!enabled) {
                throw new Error('Directive ' + directiveName + ' requires gesture recognizer [' + recognizer[1] + '] to be enabled');
              }
            }

            element.hammer = new Hammer.Manager(element[0], defaultOpts);
            scope.$on('$destroy', function() {
              element.hammer.off(eventName);
              element.hammer.destroy();
            });
          }

          handler = function(event) {
            if (VERBOSE) {
              $log.debug('angular-gestures: ', eventName, event);
            }
            var callbackHandler = function () {
              var cb = callback(scope, { $event : event});
              if (typeof cb === 'function') {
                cb.call(scope, event);
              }
            };

            if (scope.$root.$$phase === '$apply' ||
              scope.$root.$$phase === '$digest') {
              callbackHandler();
            } else {
              scope.$apply(callbackHandler);
            }

          };
          // register actual event
          element.hammer.on(eventName, handler);
        });
      };
    }]);
  });

  angular.module('angular-gestures').provider('hammerDefaultOpts', function HammerDefaultOptsProvider() {
    var opts = {};

    this.set = function(value) {
      opts = value;
    };

    this.$get = function() {
      return opts;
    };
  });
}));