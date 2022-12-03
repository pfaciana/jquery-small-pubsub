const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('test', () => {
	let newValue;

	const callbacks = [
		() => 1,
		() => 2,
		() => 3,
	];

	$.subscribe('a', callbacks[0]);
	newValue = $.publish('a');
	expect(newValue).toStrictEqual(1);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(1);

	$.subscribe('a', callbacks[1]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(2);

	$.subscribe('a', callbacks[2]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(3);

	newValue = $.publish('b', 0); // NOTE: no subscribers for b
	expect(newValue).toStrictEqual(0);

	const noValue = $.publish('c'); // NOTE: no subscribers for c
	expect(noValue).toStrictEqual(undefined);

});