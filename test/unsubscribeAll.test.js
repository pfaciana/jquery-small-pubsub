const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('test', () => {

	$.subscribe('a', () => 1);
	$.subscribe('b', () => 1);
	$.subscribe('a', () => 2);
	$.subscribe('a', () => 3);
	$.subscribe('b', () => 2);

	expect($.getSubscribedEvents('a').length).toStrictEqual(3);
	expect($.getSubscribedEvents('b').length).toStrictEqual(2);

	$.unsubscribeAll();

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);
	expect($.getSubscribedEvents('b').length).toStrictEqual(0);
});