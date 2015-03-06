'use strict';

angular.module('angular-gestures', []);

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
