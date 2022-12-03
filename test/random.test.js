const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('test', () => {

	$.subscribeOnce('b', 99, () => 'b1');
	$.subscribe('b', () => 'b');

	$.subscribeOnce('a', () => 1, () => 123);
	$.subscribeOnce('a', 100, () => 456);
	$.subscribe('a', -100, () => 789);
	$.subscribeOnce('a', () => 'xyz');

	expect($.publish('a', 1, 2, 3)).toStrictEqual(456);

	$.subscribeOnce('a', () => 'uvw');

	expect($.publish('a', 1, 2, 3)).toStrictEqual('uvw');
	expect($.publish('a', 1, 2, 3)).toStrictEqual(789);

	$.subscribe('a', -9e9, () => 'rst');

	expect($.publish('a', 1, 2, 3)).toStrictEqual(789);
	expect($.publish('a', 1, 2, 3)).toStrictEqual(789);
	expect($.publish('a', 1, 2, 3)).toStrictEqual(789);
	expect($.publish('a', 1, 2, 3)).toStrictEqual(789);

	expect($.publish('b', 1, 2, 3)).toStrictEqual('b1');
	expect($.publish('b', 1, 2, 3)).toStrictEqual('b');

	expect($.publish('c', 1, 2, 3)).toStrictEqual(1);

});