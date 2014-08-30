# angular-gestures

AngularJS directive that adds support for multi touch gestures to your app, based on hammer.js.

## Usage

* Include `gestures.js` or `gestures.min.js` into your page
* Declare `'angular-gestures'` as a dependency for your angular app: `angular.module('myApp', ['angular-gestures']);`
* Use attributes on containers the same way you use `ng-click`: e.g. `hm-tap`
```HTML
<button hm-tap="add_something()">Tap me</button>
```
* You can use angular interpolations like this : `hm-swipe="remove_something({{ id }})"`
* You can also use Hammer.js options by e.g. `hm-tap-opts="{hold: false}"`

### Event data

Pass the `$event` object in the usual way e.g. `hm-drag="myDrag($event)"` then access its internals like so:
```JS
$scope.myDrag = function(event) {
	console.log(event.gesture);
}
```
Refer to the [Hammer.js docs](https://github.com/EightMedia/hammer.js/wiki/Getting-Started) for more details on the properties of `event`.

## Supported events


* hmDoubleTap : 'doubletap',
* hmDragstart : 'dragstart',
* hmDrag : 'drag',
* hmDragUp : 'dragup',
* hmDragDown : 'dragdown',
* hmDragLeft : 'dragleft',
* hmDragRight : 'dragright',
* hmDragend : 'dragend',
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


All [Hammerjs events](https://github.com/EightMedia/hammer.js/wiki/Getting-Started) are supported. The corresponding Angularjs attribute has `hm-` prepended to the name. So for example, the 'doubletap' event becomes `hm-double-tap` etc.

*Attention* : *end and *start events are NOT CamelCased because of issues caused by $animate interference.


## Bower
If you want to use angular-momentum-scroll with bower, add the following dependency to your component.json

`"angular-gestures": "latest"`
