const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('test', () => {

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);
	expect($.getSubscribedEvents('b').length).toStrictEqual(0);

	$.subscribe('a', () => 1);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);
	expect($.getSubscribedEvents('b').length).toStrictEqual(0);

	$.subscribe('b', () => 1);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);
	expect($.getSubscribedEvents('b').length).toStrictEqual(1);

	$.subscribe('a', () => 2);
	$.subscribe('a', () => 3);
	$.subscribe('b', () => 2);

	expect($.getSubscribedEvents('a').length).toStrictEqual(3);
	expect($.getSubscribedEvents('b').length).toStrictEqual(2);

});