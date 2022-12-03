const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('test', () => {

	const callbacks = [
		() => 1,
		() => 2,
		() => 3,
	];

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

	$.subscribe('a', callbacks[0]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);

	$.subscribe('a', callbacks[1]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(2);

	$.unsubscribe('a', callbacks[0]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);

	$.subscribe('a', callbacks[2]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(2);

	$.unsubscribe('a', callbacks[2]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);

	$.unsubscribe('a', callbacks[1]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

});