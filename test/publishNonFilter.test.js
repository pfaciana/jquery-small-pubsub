const jsdom = require('jsdom');
global.jQuery = global.$ = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('./../src/pubsub');

test('filter', () => {

	var sendValue = 'some string';

	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
		return receiveValue;
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
		return receiveValue;
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
		return receiveValue;
	});

});
test('non-filter (action)', () => {

	var sendValue = 'some string';

	$.publish('a', sendValue);

	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
	});

	$.publish('a', sendValue);

});