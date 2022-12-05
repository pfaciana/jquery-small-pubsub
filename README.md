# jQuery Small Pub/Sub

A really small pub/sub implementation for jQuery.

This project is derived from Ben Alman's [jQuery Tiny Pub/Sub](https://github.com/cowboy/jquery-tiny-pubsub/) and a solution by Jud Stephenson for [getting the list of event listeners that were created in jQuery](https://stackoverflow.com/a/2518441/10184589). The difference between "jQuery Tiny Pub/Sub" and this, is that you can now "filter" through some context that is passed to all subscribers matching an event. This is based on the way WordPress does it's "filter" hooks. Along with setting a priority for the order in which the subscribers are executed. Again, similar to how WordPress has a priority for its hooks. In other words, I built this to be a very small and lightweight JavaScript pub/sub that functioned similar to the way WordPress' action & filter hooks work.

## Getting Started

### Load JavaScript

#### Option #1: In the browser

```html
<!-- In the browser -->
<script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
<script src="https://unpkg.com/jquery-small-pubsub/dist/pubsub.min.js"></script>
```

#### Option #2: In Node for a browser app

```shell
# Install from node package manager
npm i jquery-small-pubsub
```

```javascript
/* In Node */
const isPubSubLoaded = require('jquery-small-pubsub');
```

#### Option #3: In Node for a Node app

```shell
# Install from node package manager
npm i jquery-small-pubsub jquery jsdom
```

```javascript
/* In Node */
const jsdom = require('jsdom');
global.jQuery = require("jquery")((new jsdom.JSDOM('')).window);
const isPubSubLoaded = require('jquery-small-pubsub');
```

## Examples

You can look at additional examples in the `test` folder

### Basic Pub/Sub

```javascript
$.subscribe('eventName', () => console.log('Hello World'));
$.subscribe('eventName', () => console.log('Another Listener'));

$.publish('eventName');
// console: 'Hello World'
// console: 'Another Listener'

$.publish('eventName');
// console: 'Hello World'
// console: 'Another Listener'
```

### Pub/Sub once

```javascript
$.subscribe('eventName', () => console.log('Executes every time'));
$.subscribeOnce('eventName', () => console.log('Executes only once'));

$.publish('eventName');
// console: 'Executes every time'
// console: 'Executes only once'

$.publish('eventName')
// console: 'Executes every time'
```

### Pub/Sub Unsubscribe

```javascript
$.subscribe('eventName', () => console.log('Hello World'));
const callback = () => console.log('Another Listener');
$.subscribe('eventName', callback);

$.publish('eventName');
// console: 'Hello World'
// console: 'Another Listener'

$.unsubscribe('eventName', callback);
$.publish('eventName');
// console: 'Hello World'
```

### Pub/Sub w/ priority (order)

`priority` is the order the event handlers are executed. Default priority is `10`. If you have three subscribers set to priorities of `missing or undefined (becomes 10)`, `99` and `-99`, then the last subscriber is run first, because its priority is the lowest and the second subscriber runs last, because its priority is the highest. If all the subscribers have the same priority then the handlers execute in the order they were set.

```javascript
$.subscribe('eventName', () => console.log('Default Priority is 10'));
$.subscribeOnce('eventName', 99, () => console.log('Priority 99, set once'));
$.subscribe('eventName', -99, () => console.log('Priority -99'));

$.publish('eventName');
// console: 'Priority -99'
// console: 'Default Priority is 10'
// console: 'Priority 99, set once'

$.publish('eventName');
// console: 'Priority -99'
// console: 'Default Priority is 10'

const callback = () => console.log('Unsubscribe w/ priority set');
$.subscribe('eventName', 100, () => callback);
$.unsubscribe('eventName', () => callback);
// $.unsubscribe uses jQuery's off() method, so the signature only includes the name and event handler
```

### Pub/Sub w/ context

Context is passed to the event handler as the value of `this`.
If you need to set the priority along with context, then provide a `priority` key to the context.

```javascript
$.subscribe('eventName', () => console.log('context empty'));
$.subscribeOnce('eventName', {a: 1, priority: 1}, function () { console.log('a = ' + this.a); });
$.subscribe('eventName', 'some string', function () { console.log(this) });

$.publish('eventName');
// console: 'a = 1' // runs once
// console: 'context empty'
// console: 'some string'

$.publish('eventName');
// console: 'context empty'
// console: 'some string'
```

### Pub/Sub as a WordPress filter hook

```javascript
$.subscribe('eventName', {compare: 25, priority: 999}, function (isValid, someValue) {
	if (isValid) {
		return someValue > this.compare;
	}

	return false;
});
$.subscribe('eventName', (isValid, someValue) => isValid ? (someValue < 100) : false);
$.subscribeOnce('eventName', -999, (isValid, someValue) => isValid ? (someValue > 75) : false);

let isValid;
isValid = $.publish('eventName', true, 50);
// isValid === false
// 50 !> 75, so false is passed through all subsequent handlers
// NOTE: the first handler that executes (which was the last handler set, having a priority of -999) only runs once

isValid = $.publish('eventName', true, 50);
// isValid === true
// Because the last subscriber was set to subscribeOnce, it's handler doesn't get called this time
// thus 50 < 100 && 50 > 25, so true

isValid = $.publish('eventName', true, 1);
// isValid === false
// 1 < 100, but 1 !> 25, so false
```
