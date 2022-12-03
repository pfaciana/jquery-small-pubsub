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
	$.subscribe('a', callbacks[1]);
	$.subscribeOnce('a', callbacks[2]);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(3);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(2);

	$.unsubscribe('a', callbacks[1]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(1);

});