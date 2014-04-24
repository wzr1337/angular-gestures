# angular-gestures

AngularJS directive that adds support for multi touch gestures to your app. Based on hammer.js.

## Usage

* Include `gestures.js` or `gestures.min.js` into your page
* Declare `'angular-gestures'` as a dependency for your angular app: `angular.module('myApp', ['angular-gestures']);`
* Use attributes on you containers in the same way you use `ng-click` e.g. `hm-tap="add_something()"`
* You can use angular interpolations like this : `hm-swipe="remove_something({{ id }})"`
* You can also use Hammer.js options by e.g. `hm-tap-opts="{hold: false}"`

## Supported events
* hmDoubleTap : 'doubletap',
* hmDragstart : 'dragstart',
* hmDrag : 'drag',
* hmDragUp : 'dragup',
* hmDragDown : 'dragdown',
* hmDragLeft : 'dragleft',
* hmDragRight : 'dragright',
* hmDragEnd : 'dragend',
* hmHold : 'hold',
* hmPinch : 'pinch',
* hmPinchIn : 'pinchin',
* hmPinchOut : 'pinchout',
* hmRelease : 'release',
* hmRotate : 'rotate',
* hmSwipe : 'swipe',
* hmSwipeUp : 'swipeup',
* hmSwipeDown : 'swipedown',
* hmSwipeLeft : 'swipeleft',
* hmSwipeRight : 'swiperight',
* hmTap : 'tap',
* hmTouch : 'touch',
* hmTransformstart : 'transformstart',
* hmTransform : 'transform',
* hmTransformend : 'transformend'

## Bower
If you want to use angular-momentum-scroll with bower, add the following dependency to your component.json

`"angular-gestures": "latest"`
