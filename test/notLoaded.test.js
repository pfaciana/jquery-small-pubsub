const isPubSubLoaded = require('./../src/pubsub');

test('test', () => {
	expect(isPubSubLoaded).toStrictEqual(false);
});