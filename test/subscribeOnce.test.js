const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('action', () => {

	let count = 0;

	const callbacks = [
		() => ++count,
		() => ++count,
		() => ++count,
		() => ++count,
		() => ++count,
	];

	expect(count).toStrictEqual(0);
	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

	$.subscribeOnce('a', callbacks[0]);
	$.subscribeOnce('a', callbacks[1]);
	$.subscribeOnce('a', callbacks[2]);

	expect(count).toStrictEqual(0);
	expect($.getSubscribedEvents('a').length).toStrictEqual(3);

	$.publish('a');

	expect(count).toStrictEqual(3);
	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

	$.subscribeOnce('a', callbacks[3]);
	$.subscribeOnce('a', callbacks[4]);

	expect(count).toStrictEqual(3);
	expect($.getSubscribedEvents('a').length).toStrictEqual(2);

	$.publish('a');

	expect(count).toStrictEqual(5);
	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

});