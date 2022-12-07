module.exports = (function ($, undefined) {

	if (typeof $ !== 'function') {
		console.warn('jQuery is not loaded.');
		return false;
	}

	var o = $({});

	function byPriority(a, b) {
		var p1 = a?.data?.priority ?? 10;
		var p2 = b?.data?.priority ?? 10;
		return p1 - p2;
	}

	$.getSubscribedEvents = function (eventName = undefined, sort = true) {
		let allEvents = {};

		if (typeof $._data === 'function') {
			allEvents = $.extend(true, {}, $._data(o.get(0), 'events') || {})
		} else if (typeof o.data === 'function') {
			allEvents = $.extend(true, {}, o.data('events') || {})
		}

		if (typeof eventName === 'undefined') {
			return allEvents;
		}

		if (!(eventName in allEvents)) {
			return [];
		}

		sort && allEvents[eventName].sort(byPriority);

		return allEvents[eventName];
	}

	$.subscribe = function () {
		var parameters = Object.values(arguments);
		if (typeof parameters[1] == 'number') {
			parameters[1] = {priority: parameters[1]};
		}
		o.on.apply(o, parameters);
	};

	$.unsubscribe = function () {
		o.off.apply(o, arguments);
	};

	$.unsubscribeAll = function () {
		o.off();
	};

	$.subscribeOnce = function () {
		var parameters = Object.values(arguments);
		if (parameters.length <= 2) {
			parameters[2] = parameters[1];
			parameters[1] = {subscribeOnce: true};
		} else if (typeof parameters[1] == 'number') {
			parameters[1] = {priority: parameters[1], subscribeOnce: true};
		} else if (['object', 'function'].includes(typeof parameters[1]) && parameters[1] !== null) {
			parameters[1].subscribeOnce = true;
		}
		o.on.apply(o, parameters);
	};

	$.publish = function () {
		var parameters = Object.values(arguments), name = parameters.shift(), events = $.getSubscribedEvents(name);
		events.forEach(function (event) {
			parameters[0] = event.handler.apply(event.data ?? {}, parameters);
			if (event.data && ['object', 'function'].includes(typeof event.data) && 'subscribeOnce' in event.data && event.data.subscribeOnce) {
				$.unsubscribe(name, event.handler);
			}
		});
		return parameters[0];
	};

	return true;
}(typeof jQuery === 'function' ? jQuery : undefined));