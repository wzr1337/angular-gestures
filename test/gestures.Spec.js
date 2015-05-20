'use strict';

describe('A suite', function() {
	it('contains spec with an expectation', function() {
		expect(true).toBe(true);
	});
});

describe('Gesture recognizers validation', function() {

	var $compile,
		$rootScope;

	beforeEach(module('angular-gestures', function(hammerDefaultOptsProvider) {
		hammerDefaultOptsProvider.set({
			recognizers: [
				[Hammer.Tap, {}],
				[Hammer.Pinch, {
					enable: false
				}],
				[Hammer.Rotate, {
					enable: true
				}],
			]
		});
	}));

	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('should throw if no swipe recognizer is not configured and hmSwipe directive is used', function() {
		expect(function() {
			var element = $compile("<div hm-swipe='foo()'></div>")($rootScope);
			$rootScope.$digest();
		}).toThrow(new Error('Directive hmSwipe requires gesture recognizer [Hammer.Swipe] to be enabled'));
	});

	it('should not throw if tap recognizer is configured and hmTap directive is used', function() {
		var element = $compile("<div hm-tap='foo()'></div>")($rootScope);
		$rootScope.$digest();
	});

	it('should throw if pinch recognizer is configured but disabled and hmPinch directive is used', function() {
		expect(function() {
			var element = $compile("<div hm-pinch='foo()'></div>")($rootScope);
			$rootScope.$digest();
		}).toThrow(new Error('Directive hmPinch requires gesture recognizer [Hammer.Pinch] to be enabled'));
	});

	it('should not throw if rotate recognizer is configured and explicitly enabled and hmRotate directive is used', function() {
		var element = $compile('<div hm-rotate="foo()"></div>')($rootScope);
		$rootScope.$digest();
	});

	it('should not throw if hmTouch directive is used (no recognizer needed)', function() {
		var element = $compile('<div hm-touch="foo()"></div>')($rootScope);
		$rootScope.$digest();
	});
});