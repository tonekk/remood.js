# remood.js

[![npm version](https://badge.fury.io/js/remood.svg)](http://badge.fury.io/js/remood)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://tonekk.mit-license.org)

## How it works

#### You start by creating an app.

```js
var express = require('express'),
    remood = require('remood'),
    app = express(),
    server = remood(app);

// Mount routes to your app
app.get('/', function(req, res) {
  res.send('remood.js rocks!');
});

// BUT listen on the RETURNED server instance
server.listen(1337);
```

#### Then include frontend functionality

```html
<script src="js/remood.js"></script>
```

### Use it

#### Receiver

```js
// Initialize remood
var r = new remood();

// Register remood events
r.on('yourEventId', function(msg) {
  console.log(msg);
});
```

#### Remote

```js
// Initialize remood as remote
var r = new remood({ remote: true });

r.send({
  id: 'yourEventId',
  type: eventName, // Most of the time 'click' or 'input'
  data: 'my payload'
});
```

#### jQuery

Or use build in jQuery connector

```html
<div id="play">Click me!</div>
```

```js
$('#play').connect('click', function() {
  // Callback after payload {
  //   id: 'play',
  //   type: 'click',
  //   data: ''
  // } has been sent

  console.log('#play has been clicked');
});
```

## Development

In case you need to have the latest versions of dependencies:

```sh
$ cd node_modules/remood/
$ npm update --dev --depth 0
$ node ./node_modules/gulp/bin/gulp.js assets
```
