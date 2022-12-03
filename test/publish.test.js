const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('action', () => {

	let count = 0;

	const callback = () => ++count;

	expect(count).toStrictEqual(0);

	$.publish('b'); // NOTE: no subscribers at this point

	expect(count).toStrictEqual(0);

	$.subscribe('a', callback);
	$.subscribe('a', callback);
	$.subscribe('a', callback);

	$.publish('a');

	expect(count).toStrictEqual(3);

	$.publish('a');
	$.publish('b'); // NOTE: no subscribers at this point
	$.publish('a');

	expect(count).toStrictEqual(9);

	$.publish('b'); // NOTE: no subscribers at this point

	expect(count).toStrictEqual(9);

	$.subscribe('b', callback);

	$.publish('b');

	expect(count).toStrictEqual(10);

});